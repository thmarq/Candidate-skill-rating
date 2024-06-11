import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RatingResponseDocument = RatingResponse & Document;

enum DifficultyLevel {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard',
}

@Schema()
export class RatingResponse {
    @Prop({ required: true })
    skillId: number;

    @Prop({ required: true, enum: DifficultyLevel })
    difficulty_level: DifficultyLevel;

    @Prop({ required: true })
    question: string;

    @Prop()
    response: string;

    @Prop()
    rating: number;

    @Prop()
    reviewerId: string;
}

export const RatingResponseSchema = SchemaFactory.createForClass(RatingResponse);
