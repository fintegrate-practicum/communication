import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  try {
    const microserviceApp = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.URL],
        queue: process.env.RABBITMQ_QUEUE_NAME,
        exchange: process.env.RABBITMQ_EXCHANGE_NAME,
        username: process.env.AMQP_USERNAME,
        password: process.env.AMQP_PASSWORD,
      },
    });
    microserviceApp.listen();

    const httpApp = await NestFactory.create(AppModule);
    await httpApp.listen(4000);
    console.log('HTTP server is listening on port 4000');
  } catch (error) {
    console.error('Error during bootstrap:', error);
  }
}

bootstrap();
