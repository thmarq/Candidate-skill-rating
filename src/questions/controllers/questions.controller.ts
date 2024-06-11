import { Controller, Post, Body, Get, Param, HttpStatus } from '@nestjs/common';
import { CreateQuestionDto } from '../dtos/create-question.dto';
import { QuestionsService } from '../services/questions.service';
import { AnswerQuestionDto } from '../dtos/answer-question.dto';
import { Question } from '../entities/question.schema';
import { Response } from '../entities/reponse.schema';

@Controller('questions')
export class QuestionsController {
    constructor(
        private readonly questionsService: QuestionsService
    ) { }
    @Post()
    async create(@Body() createQuestionDto: CreateQuestionDto) {
        let data = await this.questionsService.createQuestion(createQuestionDto);
        return { data }
    }
    @Get()
    async getAllQuestions(): Promise<Question[]> {
        let data = await this.questionsService.getAllQuestions()
        return data;
    }

    @Get('candidate-responses')
    async getAllResponses(): Promise<Response[]> {
        let data = await this.questionsService.getAllResponses()
        return data;
    }

    @Post('add-response')
    async answer(
        // @Request() req,
        @Body() answerQuestionDto: AnswerQuestionDto) {
        return this.questionsService.answerQuestion(
            // req.user.userId,
            answerQuestionDto);
    }
}
