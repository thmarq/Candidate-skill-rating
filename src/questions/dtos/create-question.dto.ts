import { DifficultyLevel } from '../entities/question.schema';
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
    @ApiProperty({ description: 'ID of the skill associated with the question', example: 1 })
    @IsInt()
    @Min(1)
    skillId: number;

    @ApiProperty({ description: 'Difficulty level of the question', enum: DifficultyLevel })
    @IsEnum(DifficultyLevel)
    difficulty_level: DifficultyLevel;

    @ApiProperty({ description: 'The text of the question' })
    @IsString()
    @IsNotEmpty()
    question: string;
}

