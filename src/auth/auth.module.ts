import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { controllers } from './controllers/index';
import { services } from './services/index';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    UsersModule,
   
  ],
  controllers: [
    ...controllers
  ],
  providers: [
    ...services
  ],
  exports: [
  ]

})
export class AuthModule { }
