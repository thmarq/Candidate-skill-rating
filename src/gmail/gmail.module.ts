import { Module } from '@nestjs/common';
import { GmailController } from './gmail.controller';
import { Services } from './services';

@Module({
  controllers: [GmailController],
  providers: [
    ...Services
  ]
})
export class GmailModule { }
