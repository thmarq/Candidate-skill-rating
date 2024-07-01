import { Controller, Get } from '@nestjs/common';
import { GoogleAuthService } from './services/google-auth.service';
import { Public } from 'src/common/public.decorator';

@Controller('gmail')
export class GmailController {
    constructor(
        private readonly gmailService: GoogleAuthService
    ) { }

    @Public()
    @Get('test')
    async getTest() {
        return await this.gmailService.authorize();
    }

}
