import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';


@Injectable()
export class RabbitPublisherService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor() {
    this.connectToRabbitMQ();
  }

  async connectToRabbitMQ() {
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
    
    await this.channel.assertExchange('my_exchange', 'direct', { durable: false });
    await this.channel.assertQueue('my_queue', { durable: true });
    await this.channel.bindQueue('my_queue', 'my_exchange', 'routing_key');
  }

  async publishMessage(routingKey: string, message: any) {
    this.channel.publish('my_exchange', routingKey, Buffer.from(JSON.stringify(message)));
    console.log(`Message published with routing key ${routingKey}`);  
    console.log("hello");
    
  }
}


