import { Question, QuestionSchema } from "./question.schema";
import { RatingResponse, RatingResponseSchema } from "./rating.schema";
import { Response, ResponseSchema } from "./reponse.schema";

export const Entities = [
    {
        name: Question.name,
        schema: QuestionSchema
    },
    {
        name: RatingResponse.name,
        schema: RatingResponseSchema
    },
    {
        name: Response.name,
        schema: ResponseSchema
    }
]