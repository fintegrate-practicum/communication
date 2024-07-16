import { Test, TestingModule } from '@nestjs/testing';
import { EmailSettingsService } from './email-settings.service';
import { getModelToken } from '@nestjs/mongoose';
import { EmailSettings } from '../schemas/email-settings.schema';

describe('EmailSettingsService', () => {
  let service: EmailSettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailSettingsService,
        { provide: getModelToken(EmailSettings.name), useValue: {} },
      ],
    }).compile();

    service = module.get<EmailSettingsService>(EmailSettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
