import { Module } from '@nestjs/common';
import { services } from './services';
import { controllers } from './controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { Entities } from './entities';

@Module({
  imports: [MongooseModule.forFeature([...Entities])],
  providers: [...services],
  controllers: [...controllers],
})
export class QuestionsModule {}
