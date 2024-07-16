import { Test, TestingModule } from '@nestjs/testing';
import { EmailSettingsController } from './email-settings.controller';
import { EmailSettingsService } from '../services/email-settings.service';
import { getModelToken } from '@nestjs/mongoose';
import { EmailSettings } from '../schemas/email-settings.schema';

describe('EmailSettingsController', () => {
  let controller: EmailSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailSettingsController],
      providers: [
        EmailSettingsService,
        { provide: getModelToken(EmailSettings.name), useValue: {} },
      ],
    }).compile();

    controller = module.get<EmailSettingsController>(EmailSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
