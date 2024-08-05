import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { EmailLogService } from '../email-log/services/email-log.service';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';
import { Logger } from '@nestjs/common';
import { EmailLogStatus } from 'src/email-log/email-log-status.enum';
import { CreateEmailLogDto, UpdateEmailLogDto } from '../email-log/dto/email-log.dto';
import { EmailLogDocument } from '../email-log/schemas/email-log.schema';

// Mocking SendGrid and EmailLogService
jest.mock('@sendgrid/mail');
jest.mock('../email-log/services/email-log.service');

describe('EmailService', () => {
  let emailService: EmailService;
  let emailLogService: EmailLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: EmailLogService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              const config = {
                SENDGRID_API_KEY: 'fake-sendgrid-api-key',
                SENDGRID_FROM_EMAIL: 'from@example.com',
              };
              return config[key];
            }),
          },
        },
      ],
    }).compile();

    emailService = module.get<EmailService>(EmailService);
    emailLogService = module.get<EmailLogService>(EmailLogService);
  });

  it('should be defined', () => {
    expect(emailService).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should send email and update log', async () => {
      const emailLog = { _id: '123' } as EmailLogDocument;

      jest.spyOn(emailLogService, 'create').mockResolvedValue(emailLog);
      jest.spyOn(emailLogService, 'update').mockResolvedValue(null);
      jest
        .spyOn(sgMail, 'send')
        .mockResolvedValue([{ statusCode: 202, body: [], headers: {} }, {}]);
      const to = 'test@example.com';
      const subject = 'Test Subject';
      const html = '<p>Test HTML</p>';
      const kindSubject = 'Test Kind';
      const businessId = 'test-business-id';

      await emailService.sendEmail(to, subject, html, kindSubject, businessId);

      expect(emailLogService.create).toHaveBeenCalledWith({
        status: EmailLogStatus.PENDING,
        kindSubject,
        businessId,
        recipient: to,
        timestamp: expect.any(Date),
      });

      expect(emailLogService.update).toHaveBeenCalledWith(emailLog._id.toString(), {
        status: EmailLogStatus.SENT,
      });

      expect(sgMail.send).toHaveBeenCalledWith({
        to,
        from: 'from@example.com',
        subject,
        html,
        attachments: expect.any(Array),
      });
    });

    it('should handle errors and update log', async () => {
      const emailLog = { _id: '123' } as EmailLogDocument;

      jest.spyOn(emailLogService, 'create').mockResolvedValue(emailLog);
      jest.spyOn(emailLogService, 'update').mockResolvedValue(null);
      jest.spyOn(sgMail, 'send').mockRejectedValue(new Error('SendGrid error'));

      const to = 'test@example.com';
      const subject = 'Test Subject';
      const html = '<p>Test HTML</p>';
      const kindSubject = 'Test Kind';
      const businessId = 'test-business-id';

      await emailService.sendEmail(to, subject, html, kindSubject, businessId);

      expect(emailLogService.create).toHaveBeenCalledWith({
        status: EmailLogStatus.PENDING,
        kindSubject,
        businessId,
        recipient: to,
        timestamp: expect.any(Date),
      });

      expect(emailLogService.update).toHaveBeenCalledWith(emailLog._id.toString(), {
        status: EmailLogStatus.FAILED,
        errorMessage: 'SendGrid error',
      });

      expect(sgMail.send).toHaveBeenCalledWith({
        to,
        from: 'from@example.com',
        subject,
        html,
        attachments: expect.any(Array),
      });
    });
  });
});
