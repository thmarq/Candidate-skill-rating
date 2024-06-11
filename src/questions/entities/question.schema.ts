import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

@Schema()
export class Question extends Document {
  @Prop({ required: true })
  skillId: number;

  @Prop({ required: true, enum: DifficultyLevel })
  difficulty_level: DifficultyLevel;

  @Prop({ required: true })
  question: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);