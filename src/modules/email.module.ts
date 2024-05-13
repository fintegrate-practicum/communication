import { Module } from '@nestjs/common';
import { EmailService } from '../services/email.service';
import { MessageService } from '../services/message.service';

@Module({
  providers: [EmailService, MessageService],
})
export class EmailModule {}
