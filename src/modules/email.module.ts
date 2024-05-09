import { Module } from '@nestjs/common';
import { EmailService } from '../services/email/email.service';
import { MessageService } from '../services/message/message.service';

@Module({
  providers: [EmailService, MessageService]
})

export class EmailModule { }
