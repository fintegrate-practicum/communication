import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';
import { EmailLogService } from '../email-log/services/email-log.service';
import { EmailLogStatus } from '../email-log/email-log-status.enum';
import * as mailgun from 'mailgun-js';

jest.mock('mailgun-js');

describe('EmailService', () => {
  let service: EmailService;
  let emailLogService: EmailLogService;
  let configService: ConfigService;
  let mailgunMock: jest.Mock;

  const mockEmailLogService = {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      switch (key) {
        case 'MAILGUN_API_KEY':
          return 'test-api-key';
        case 'MAILGUN_DOMAIN':
          return 'sandbox1234567890.mailgun.org';
        case 'MAILGUN_EMAIL':
          return 'Test <test@sandbox1234567890.mailgun.org>';
        default:
          return null;
      }
    }),
  };

  const mailgunMessagesMock = {
    send: jest.fn(),
  };

  beforeEach(async () => {
    mailgunMock = mailgun as jest.Mock;
    mailgunMock.mockReturnValue({
      messages: jest.fn().mockReturnValue(mailgunMessagesMock),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        { provide: EmailLogService, useValue: mockEmailLogService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    emailLogService = module.get<EmailLogService>(EmailLogService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendEmail', () => {
    const mockMessage = {
      to: 'test@example.com',
      subject: 'Test Subject',
      html: '<p>Test Email</p>',
      kindSubject: 'testKind',
      businessId: 'testBusinessId',
    };

    it('should create email log with PENDING status', async () => {
      const mockEmailLog = { _id: 'testId' };
      mockEmailLogService.create.mockResolvedValue(mockEmailLog);

      await service.sendEmail(
        mockMessage.to,
        mockMessage.subject,
        mockMessage.html,
        mockMessage.kindSubject,
        mockMessage.businessId,
      );

      expect(mockEmailLogService.create).toHaveBeenCalledWith({
        status: EmailLogStatus.PENDING,
        kindSubject: mockMessage.kindSubject,
        businessId: mockMessage.businessId,
        recipient: mockMessage.to,
        timestamp: expect.any(Date),
      });
    });

    it('should send email using mailgun and update email log with SENT status', async () => {
      const mockEmailLog = { _id: 'testId' };
      mockEmailLogService.create.mockResolvedValue(mockEmailLog);

      await service.sendEmail(
        mockMessage.to,
        mockMessage.subject,
        mockMessage.html,
        mockMessage.kindSubject,
        mockMessage.businessId,
      );

      expect(mailgunMessagesMock.send).toHaveBeenCalledWith({
        from: 'Test <test@sandbox1234567890.mailgun.org>',
        to: mockMessage.to,
        subject: mockMessage.subject,
        html: mockMessage.html,
      });

      expect(mockEmailLogService.update).toHaveBeenCalledWith('testId', {
        status: EmailLogStatus.SENT,
      });
    });

    it('should update email log with FAILED status if sending email fails', async () => {
      const mockEmailLog = { _id: 'testId' };
      mockEmailLogService.create.mockResolvedValue(mockEmailLog);
      mailgunMessagesMock.send.mockRejectedValue(new Error('Send error'));

      await service.sendEmail(
        mockMessage.to,
        mockMessage.subject,
        mockMessage.html,
        mockMessage.kindSubject,
        mockMessage.businessId,
      );

      expect(mockEmailLogService.update).toHaveBeenCalledWith('testId', {
        status: EmailLogStatus.FAILED,
        errorMessage: 'Send error',
      });
    });
  });

  describe('getEmailLogById', () => {
    it('should call emailLogService.findById', async () => {
      const mockEmailLog = { _id: 'testId', recipient: 'test@example.com' };
      mockEmailLogService.findById.mockResolvedValue(mockEmailLog);

      const result = await service.getEmailLogById('testId');
      expect(result).toEqual(mockEmailLog);
      expect(mockEmailLogService.findById).toHaveBeenCalledWith('testId');
    });
  });
});
