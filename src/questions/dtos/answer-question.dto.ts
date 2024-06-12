import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnswerQuestionDto {
  @ApiProperty({
    description: 'The ID of the candidate user',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  userId: string;

  @ApiProperty({
    description: 'The ID of the question',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  questionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  response: string;
}
