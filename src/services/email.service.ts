import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
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

  constructor(
    private readonly emailLogService: EmailLogService,
    private readonly configService: ConfigService,
  ) {
    sgMail.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
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

    // קריאת תמונות והמרתן ל-Base64
    const imagePath1 = path.join(__dirname, '..', '..', 'public', 'images', 'group2.png');
    const imagePath2 = path.join(__dirname, '..', '..', 'public', 'images', 'group.png');
    const imageBase64_1 = fs.readFileSync(imagePath1).toString('base64');
    const imageBase64_2 = fs.readFileSync(imagePath2).toString('base64');

    const msg = {
      to,
      from: this.configService.get<string>('SENDGRID_FROM_EMAIL'),
      subject,
      html,
      attachments: [
        {
          content: imageBase64_1,
          filename: 'group2.png',
          type: 'image/png',
          disposition: 'inline',
          content_id: 'headerImage',
        },
        {
          content: imageBase64_2,
          filename: 'group.png',
          type: 'image/png',
          disposition: 'inline',
          content_id: 'footerImage',
        },
      ],
    };

    try {
      this.logger.log(`Sending email to ${to}`);
      await sgMail.send(msg);
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
