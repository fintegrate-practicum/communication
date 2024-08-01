import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { MailBridgeService } from './services/mail-bridge/mail-bridge.service';
import { Message, MessageType } from './interface/message.interface';

describe('AppController', () => {
  let appController: AppController;
  let mailBridgeService: MailBridgeService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: MailBridgeService,
          useValue: {
            handleMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    mailBridgeService = moduleRef.get<MailBridgeService>(MailBridgeService);
  });

  describe('handleEvent', () => {
    it('should call handleMessage with the correct message', async () => {
      const message: Message = {
        to: 'test@example.com',
        subject: 'Test Subject',
        html: '<p>Test</p>',
        type: MessageType.Email,
        kindSubject: 'testKind',
        businessId: 'testBusinessId',
      };

      await appController.handleEvent(message);

      expect(mailBridgeService.handleMessage).toHaveBeenCalledWith(message);
    });
  });
});
