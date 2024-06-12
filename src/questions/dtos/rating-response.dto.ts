import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class RateResponseDto {
  @ApiProperty({
    description: 'ID of the skill associated with the response',
    example: 101,
  })
  @IsInt()
  @Min(1)
  skillId: number;

  @ApiProperty({
    description: 'Difficulty level of the question',
    enum: ['easy', 'medium', 'hard'],
    example: 'medium',
  })
  @IsEnum(['easy', 'medium', 'hard'])
  difficulty_level: 'easy' | 'medium' | 'hard';

  @ApiProperty({
    description: 'The text of the question',
    example: 'What is the capital of France?',
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({ description: 'The text of the response', example: 'Paris' })
  @IsString()
  @IsNotEmpty()
  response: string;

  @ApiProperty({
    description: 'Rating given to the response',
    minimum: 1,
    maximum: 5,
    example: 4,
  })
  @IsInt()
  @Min(1)
  rating: number;

  @ApiProperty({ description: 'ID of the reviewer', example: 'user123' })
  @IsString()
  @IsNotEmpty()
  reviewerId: string;
}

export class UpdateRateResponseDto extends PartialType(RateResponseDto) {}
