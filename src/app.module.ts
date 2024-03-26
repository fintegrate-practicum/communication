import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MailService} from './mail/mail.service'
import { MailController } from './mail/mail.controller';

@Module({
  imports: [],
  controllers: [AppController, MailController],
  providers: [AppService, MailService],
})
export class AppModule {}