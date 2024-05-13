import { Injectable, Logger } from '@nestjs/common';
import { Message, MessageType } from '../interface/message.interface';
import { EmailService } from './email.service';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(private readonly mailerService: EmailService) {}

  async sendMessage(message: Message): Promise<void> {
    switch (message.type) {
      case MessageType.Email:
        await this.sendEmail(message);
        break;
      case MessageType.Sms:
        await this.sendSms(message);
        break;
      default:
        throw new Error(`Unsupported message type: ${message.type}`);
    }
  }

  private async sendEmail(message: Message): Promise<void> {
    const { to, subject, html } = message;
    await this.mailerService.sendEmail(to, subject, html);
  }

  private async sendSms(message: Message): Promise<void> {
    const { to, html } = message;
    const data = {
      to,
      html,
    };
    this.logger.log(data);
  }
}
