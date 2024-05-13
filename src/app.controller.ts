import { MessagePattern, Payload } from '@nestjs/microservices';
import { Message } from 'amqplib';
import { Controller } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}
  @MessagePattern('message_queue')
  async handleEvent(@Payload() message: Message) {
    console.log('Received the message:', message);
    //take care of message
  }
}
