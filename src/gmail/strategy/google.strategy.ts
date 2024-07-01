import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('CLIENT_ID'),
      clientSecret: configService.get<string>('CLIENT_SECRET'),
    //   callbackURL: configService.get<string>('GMAIL_REDIRECT_URI'),
      scope: ['email', 'profile', 'https://mail.google.com/'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    done(null, { accessToken, refreshToken, profile });
  }
}
