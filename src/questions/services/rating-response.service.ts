import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RateResponseDto } from '../dtos/rate-response.dto';
import { Response } from '../entities/reponse.schema';

@Injectable()
export class RatingResponseService {
  constructor(
    @InjectModel(Response.name) private responseModel: Model<Response>,
  ) {}

  async getAggregateSkillRating(skillId: number): Promise<any> {
    const responses = await this.responseModel.find({ skillId }).exec();

    if (responses.length === 0) {
      return { skillId, rating: 0 };
    }
    let easyCount = 0,
      mediumCount = 0,
      hardCount = 0;
    let easyTotal = 0,
      mediumTotal = 0,
      hardTotal = 0;

    responses.forEach((rating) => {
      switch (rating.difficulty_level) {
        case 'easy':
          easyCount++;
          easyTotal += rating.rating;
          break;
        case 'medium':
          mediumCount++;
          mediumTotal += rating.rating;
          break;
        case 'hard':
          hardCount++;
          hardTotal += rating.rating;
          break;
        default:
          break;
      }
    });

    const totalquestions = easyCount + 2 * mediumCount + 3 * hardCount;
    const weightedSum = 1 * easyTotal + 2 * mediumTotal + 3 * hardTotal;
    const aggregateRating = weightedSum / totalquestions;

    return { skillId, rating: aggregateRating.toFixed(1) };
  }
  async findAll(): Promise<Response[]> {
    return this.responseModel.find().exec();
  }

  async rateResponse(rateResponseDto: RateResponseDto): Promise<Response> {
    const { rating } = rateResponseDto;
    return await this.responseModel.findByIdAndUpdate(
      rateResponseDto.responseId,
      { rating },
      { new: true },
    );
  }
}
