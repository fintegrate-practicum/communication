import { Injectable } from '@nestjs/common';
import * as mailgun from 'mailgun-js';
@Injectable()
export class MailService {
  private mailgun;

  constructor() {
    this.mailgun = mailgun({ apiKey: 'YOUR_MAILGUN_API_KEY', domain: 'YOUR_MAILGUN_DOMAIN' });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const data = {
      from: 'your-email@example.com',
      to,
      subject,
      text,
    };

    try {
      await this.mailgun.messages().send(data);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

