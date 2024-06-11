import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from '../entities/question.schema';
import { RatingResponse } from '../entities/rating.schema';
import { CreateQuestionDto } from '../dtos/create-question.dto';
import { RateResponseDto } from '../dtos/rate-response.dto';
import { AnswerQuestionDto } from '../dtos/answer-question.dto';
import { Response } from '../entities/reponse.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
    @InjectModel(Response.name) private responseModel: Model<Response>,
  ) { }

  async createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
    return await this.questionModel.create(createQuestionDto)
  }

  async getAllQuestions(): Promise<Question[]> {
    return await this.questionModel.find()
  }

  async getAllResponses(): Promise<Response[]> {
    return await this.responseModel.find()
  }



  async answerQuestion(
    // userId: string,
    answerQuestionDto: AnswerQuestionDto)
  // :Promise<Response> 
  {
    const { questionId, userId, response } = answerQuestionDto;
    let question = await this.questionModel.findById(questionId)
    if (!question) {
      throw new BadRequestException('Question not found')
    }
    const newResponse = await this.responseModel.create({
      skillId: question.skillId,
      question: question.question,
      difficulty_level: question.difficulty_level,
      questionId,
      userId,
      response
    })
    return newResponse;
  }

  async reviewResponse(rateResponseDto: RateResponseDto): Promise<Response> {
    const { responseId, rating } = rateResponseDto;
    const response = await this.responseModel.findOne({ _id: responseId });
    if (response) {
      throw new BadRequestException('Candidate response not found')
    }
    return await this.responseModel.findOneAndUpdate({ _id: responseId }, { rating }, { new: true })
  }
}