import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { EmailService } from './email.service';
import { MessageType, Message } from '../interface/message.interface';
import { Logger } from '@nestjs/common';

describe('MessageService', () => {
  let service: MessageService;
  let emailService: EmailService;

  const mockEmailService = {
    sendEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageService, { provide: EmailService, useValue: mockEmailService }],
    }).compile();

    service = module.get<MessageService>(MessageService);
    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendMessage', () => {
    it('should call sendEmail if message type is Email', async () => {
      const message: Message = {
        to: 'test@example.com',
        subject: 'Test Subject',
        html: '<p>Test Email</p>',
        type: MessageType.Email,
        kindSubject: 'testKind',
        businessId: 'testBusinessId',
      };

      const sendEmailSpy = jest
        .spyOn(service as any, 'sendEmail')
        .mockImplementation(async () => {});

      await service.sendMessage(message);

      expect(sendEmailSpy).toHaveBeenCalledWith(message);
    });

    it('should call sendSms if message type is Sms', async () => {
      const message: Message = {
        to: '1234567890',
        html: 'Test SMS',
        type: MessageType.Sms,
        kindSubject: 'testKind',
        businessId: 'testBusinessId',
      };

      const sendSmsSpy = jest
        .spyOn(service as any, 'sendSms')
        .mockImplementation(async () => {});

      await service.sendMessage(message);

      expect(sendSmsSpy).toHaveBeenCalledWith(message);
    });

    it('should throw an error if message type is unsupported', async () => {
      const message: Message = {
        to: 'test@example.com',
        html: '<p>Test</p>',
        type: 'UnsupportedType' as MessageType,
        kindSubject: 'testKind',
        businessId: 'testBusinessId',
      };

      await expect(service.sendMessage(message)).rejects.toThrow(
        'Unsupported message type: UnsupportedType',
      );
    });
  });

  describe('sendEmail', () => {
    it('should call mailerService.sendEmail with correct parameters', async () => {
      const message: Message = {
        to: 'test@example.com',
        subject: 'Test Subject',
        html: '<p>Test Email</p>',
        type: MessageType.Email,
        kindSubject: 'testKind',
        businessId: 'testBusinessId',
      };

      await (service as any)['sendEmail'](message);

      expect(emailService.sendEmail).toHaveBeenCalledWith(
        message.to,
        message.subject,
        message.html,
        message.kindSubject,
        message.businessId,
      );
    });
  });

  describe('sendSms', () => {
    it('should log the SMS data', async () => {
      const message: Message = {
        to: '1234567890',
        html: 'Test SMS',
        type: MessageType.Sms,
        kindSubject: 'testKind',
        businessId: 'testBusinessId',
      };
      jest.spyOn(Logger.prototype, 'log').mockImplementation(() => {});

      await (service as any)['sendSms'](message);

      expect(Logger.prototype.log).toHaveBeenCalledWith({
        to: message.to,
        html: message.html,
      });
    });
  });
});
