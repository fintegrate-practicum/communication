import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { Message } from './interface/message.interface';
import { MailBridgeService } from './services/mail-bridge/mail-bridge.service';

@Controller()
export class AppController {
  constructor(private readonly handleMessage: MailBridgeService) {}

  @MessagePattern('message_exchange')
  async handleEvent(@Payload() message: Message) {
    await this.handleMessage.handleMessage(message);
    //take care of message
  }
}
