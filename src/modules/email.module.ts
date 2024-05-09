import { Module } from '@nestjs/common';
import { EmailService } from 'src/services/email/email.service';
import { MessageService } from 'src/services/message/message.service';

@Module({
  providers: [EmailService, MessageService]
})

export class EmailModule { }
