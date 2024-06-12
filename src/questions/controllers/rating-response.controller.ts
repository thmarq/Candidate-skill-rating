import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { RateResponseDto } from '../dtos/rate-response.dto';
import { RatingResponseService } from '../services/rating-response.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('Candidate rating')
@ApiBearerAuth()
@Controller('rating')
export class RatingResponseController {
  constructor(private readonly ratingResponseService: RatingResponseService) { }

  @Patch('candidate-response')
  create(@Body() rateResponseDto: RateResponseDto) {
    return this.ratingResponseService.rateResponse(rateResponseDto);
  }
  

  @Get('aggregate/:skillId')
  getAggregateSkillRating(@Param('skillId') skillId: number) {
    return this.ratingResponseService.getAggregateSkillRating(skillId);
  }
}
