import { Test, TestingModule } from '@nestjs/testing';
import { MailBridgeService } from './mail-bridge.service';
import { readFile } from 'fs/promises';
import { MessageService } from '../message.service';

jest.mock('fs/promises');

describe('MailBridgeService', () => {
  let service: MailBridgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailBridgeService, { provide: MessageService, useValue: {} }],
    }).compile();

    service = module.get<MailBridgeService>(MailBridgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should replace placeholders with correct values in sendNewEmployeeEmail', async () => {
    const mockHtmlTemplate = `
      <p>Hello [candidate's name],</p>
      <p>Congratulations on your new role as [job title]!</p>
      <p>Please click the following link to get started: [Invitation Link]</p>
    `;
    (readFile as jest.Mock).mockResolvedValue(mockHtmlTemplate);

    const message = {
      name: 'John Doe',
      jobTitle: 'Software Engineer',
      invitationLink: 'http://example.com/invite',
    };

    const expectedHtml = `
      <p>Hello John Doe,</p>
      <p>Congratulations on your new role as Software Engineer!</p>
      <p>Please click the following link to get started: http://example.com/invite</p>
    `;

    const result = await service['sendNewEmployeeEmail'](message);
    expect(result).toBe(expectedHtml);
  });
});
