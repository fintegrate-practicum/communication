import { Controller, Post, Body } from '@nestjs/common';
import {MailService} from './mail.service'
@Controller('emails')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendEmail(@Body() emailData: { to: string; subject: string; text: string }) {
    const { to, subject, text } = emailData;
    await this.mailService.sendEmail(to, subject, text);
    return 'Email sent successfully!';
  }
}
