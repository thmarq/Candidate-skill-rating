import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
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
  ],
  exports: [
    ...services
  ]
})
export class UsersModule { }
