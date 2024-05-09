import { Injectable,Logger } from '@nestjs/common';
import * as mailgun from 'mailgun-js';
require('dotenv').config();

@Injectable()
export class EmailService {

  private readonly logger = new Logger(EmailService.name);

  private mailgun = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

  async sendEmail(to: string, subject: string, html: string) {

    const data = {
      from: process.env.MAILGUN_EMAIL,
      to,
      subject,
      html,
    };

    try {
      await this.mailgun.messages().send(data);
      this.logger.log('email sent successfully');
    } catch (error) {
      this.logger.error('Error sending email:', error);
    }

  }
}







