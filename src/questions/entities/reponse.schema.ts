import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

enum DifficultyLevel {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

@Schema()
export class Response extends Document {
  @Prop({ required: true })
  skillId: number;

  @Prop({ required: true, enum: DifficultyLevel })
  difficulty_level: DifficultyLevel;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Question', required: true })
  questionId: Types.ObjectId;

  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  response: string;

  @Prop({ default: 0 })
  rating?: number;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
