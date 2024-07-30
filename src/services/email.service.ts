import { Injectable, Logger } from '@nestjs/common';
import * as mailgun from 'mailgun-js';
import { ConfigService } from '@nestjs/config';
import { EmailLogService } from '../email-log/services/email-log.service';
import { CreateEmailLogDto, UpdateEmailLogDto } from '../email-log/dto/email-log.dto';
import { EmailLogStatus } from 'src/email-log/email-log-status.enum';
import { EmailLogDocument } from '../email-log/schemas/email-log.schema';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  private mailgun;

  constructor(
    private readonly emailLogService: EmailLogService,
    private readonly configService: ConfigService,
  ) {
    this.mailgun = mailgun({
      apiKey: this.configService.get<string>('MAILGUN_API_KEY'),
      domain: this.configService.get<string>('MAILGUN_DOMAIN'),
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    html: string,
    kindSubject: string,
    businessId: string,
  ) {
    const createEmailLogDto: CreateEmailLogDto = {
      status: EmailLogStatus.PENDING,
      kindSubject,
      businessId,
      recipient: to,
      timestamp: new Date(),
    };

    const emailLog: EmailLogDocument =
      await this.emailLogService.create(createEmailLogDto);
    const imagePath1 = path.join(__dirname, '..', '..', 'public', 'images', 'group2.png');
    const imagePath2 = path.join(__dirname, '..', '..', 'public', 'images', 'group.png');
    const data = {
      from: this.configService.get<string>('MAILGUN_EMAIL'),
      //   התמונות נשלחות מצורפות למייל אך לא מוצגות כראוי בגוף ההדעה
      to,
      subject,
      html,
      attachment: [fs.createReadStream(imagePath1), fs.createReadStream(imagePath2)],
    };

    try {
      this.logger.log(`Image paths: ${imagePath1}, ${imagePath2}`);
      await this.mailgun.messages().send(data);
      this.logger.log('Email sent successfully');

      const updateEmailLogDto: UpdateEmailLogDto = {
        status: EmailLogStatus.SENT,
      };
      await this.emailLogService.update(
        emailLog._id.toString(), // שימוש ב-ID של ה-EmailLog
        updateEmailLogDto,
      );
    } catch (error) {
      this.logger.error('Error sending email:', error);

      const updateEmailLogDto: UpdateEmailLogDto = {
        status: EmailLogStatus.FAILED,
        errorMessage: error.message,
      };
      await this.emailLogService.update(emailLog._id.toString(), updateEmailLogDto);
    }
  }
  async getEmailLogById(id: string): Promise<EmailLogDocument> {
    return this.emailLogService.findById(id);
  }
}
