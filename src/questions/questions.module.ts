import { Module } from '@nestjs/common';
import { QuestionsService } from './services/questions.service';
import { QuestionsController } from './controllers/questions.controller';
import { services } from './services';
import { controllers } from './controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { Entities } from './entities';

@Module({
  imports: [
    MongooseModule.forFeature([...Entities])
  ],
  providers: [
    ...services
  ],
  controllers: [
    ...controllers
  ]
})
export class QuestionsModule { }
