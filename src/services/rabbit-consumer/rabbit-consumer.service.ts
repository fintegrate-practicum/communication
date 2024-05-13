import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class RabbitConsumerService {
  @MessagePattern('message_queue')
  async handleEvent() {}
}
