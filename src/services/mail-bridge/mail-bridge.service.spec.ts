import { Test, TestingModule } from '@nestjs/testing';
import { MailBridgeService } from './mail-bridge.service';
import { MessageService } from '../message.service';
import { readFile } from 'fs/promises';
import * as ejs from 'ejs';
import { Message, MessageType } from '../../interface/message.interface';

jest.mock('fs/promises');
jest.mock('ejs');

describe('MailBridgeService', () => {
  let service: MailBridgeService;
  let messageService: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailBridgeService,
        {
          provide: MessageService,
          useValue: {
            sendMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MailBridgeService>(MailBridgeService);
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('renderTemplate', () => {
    it('should render template with provided data', async () => {
      const templatePath = 'path/to/template.ejs';
      const templateData = { key: 'value' };
      const renderedContent = '<h1>Rendered Content</h1>';

      (readFile as jest.Mock).mockResolvedValue('template content');
      (ejs.render as jest.Mock).mockReturnValue(renderedContent);

      const result = await (service as any).renderTemplate(templatePath, templateData);

      expect(readFile).toHaveBeenCalledWith(templatePath, 'utf-8');
      expect(ejs.render).toHaveBeenCalledWith('template content', templateData);
      expect(result).toBe(renderedContent);
    });

    it('should throw error when template reading or rendering fails', async () => {
      const templatePath = 'path/to/template.ejs';
      const templateData = { key: 'value' };

      (readFile as jest.Mock).mockRejectedValue(new Error('Read error'));

      await expect(
        (service as any).renderTemplate(templatePath, templateData),
      ).rejects.toThrow('Failed to read or render EJS template');
    });
  });

  describe('handleMessage', () => {
    it('should handle message and send formatted message', async () => {
      const message = {
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test Text',
        kindSubject: 'message',
        code: '1234',
        name: 'Test Name',
        jobTitle: 'Test Job',
        invitationLink: 'http://example.com',
        description: 'Test Description',
        date: new Date(),
        managerName: 'Manager Name',
        numOrder: 'Order123',
        nameBusinessCode: 'Code123',
        dateOrder: '2023-07-18',
        city: 'Test City',
        street: 'Test Street',
        numBuild: 123,
        businessId: 'Business123',
      };

      const templateData = {
        to: message.to,
        subject: message.subject,
        text: message.text,
        code: message.code,
        name: message.name,
        jobTitle: message.jobTitle,
        invitationLink: message.invitationLink,
        description: message.description,
        date: message.date?.toISOString().split('T')[0],
        managerName: message.managerName,
        numOrder: message.numOrder,
        nameBusinessCode: message.nameBusinessCode,
        dateOrder: message.dateOrder,
        city: message.city,
        street: message.street,
        numBuild: message.numBuild,
      };

      const renderedContent = '<h1>Rendered Content</h1>';
      jest.spyOn(service as any, 'renderTemplate').mockResolvedValue(renderedContent);

      await service.handleMessage(message);

      expect(service['renderTemplate']).toHaveBeenCalledWith(
        'src/EmployeeInvitationEmail/EmployeeMessageEmail.ejs',
        templateData,
      );

      const expectedMessage: Message = {
        to: message.to,
        subject: message.subject,
        html: renderedContent,
        type: MessageType.Email,
        kindSubject: message.kindSubject,
        businessId: message.businessId,
      };

      expect(messageService.sendMessage).toHaveBeenCalledWith(expectedMessage);
    });

    it('should send default content if template rendering fails', async () => {
      const message = {
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test Text',
        kindSubject: 'message',
        businessId: 'Business123',
      };

      jest
        .spyOn(service as any, 'renderTemplate')
        .mockRejectedValue(new Error('Render error'));

      await service.handleMessage(message);

      const expectedMessage: Message = {
        to: message.to,
        subject: message.subject,
        html: 'Default HTML content',
        type: MessageType.Email,
        kindSubject: message.kindSubject,
        businessId: message.businessId,
      };

      expect(messageService.sendMessage).toHaveBeenCalledWith(expectedMessage);
    });

    it('should throw an error if unknown kindSubject', async () => {
      const message = {
        to: 'test@example.com',
        subject: 'Test Subject',
        kindSubject: 'unknown',
        businessId: 'Business123',
      };

      await expect(service.handleMessage(message)).rejects.toThrow(
        'Unknown kindSubject: unknown',
      );
    });
  });
});
