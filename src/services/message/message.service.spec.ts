import { MessageService } from './message.service';
import { EmailService } from '../email/email.service';
import { MessageType } from 'src/interface/message.interface';

describe('MessageService', () => {
  let messageService: MessageService;
  let emailService: EmailService;

  beforeEach(() => {
    emailService = {
      sendEmail: jest.fn(),
    } as unknown as EmailService;
    messageService = new MessageService(emailService);
  });

  it('should send email when message type is email', async () => {
    const message = {
      type: MessageType.Email,
      to: 'test@example.com',
      subject: 'Test Subject',
      html: '<p>Test HTML</p>',
    };

    await messageService.sendMessage(message);

    expect(emailService.sendEmail).toHaveBeenCalledWith(
      message.to,
      message.subject,
      message.html,
    );
  });

  it('should throw error for unsupported message type', async () => {
    const message = {
      type: 'UnsupportedType',
      to: '',
      html: '',
    };
    // @ts-ignore
    await expect(messageService.sendMessage(message)).rejects.toThrow(
      'Unsupported message type: UnsupportedType',
    );
  });
});
