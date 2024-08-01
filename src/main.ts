import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  try {
    const microserviceApp = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL],
        queue: process.env.RABBITMQ_QUEUE_NAME,
        exchange: process.env.RABBITMQ_EXCHANGE_NAME,
        username: process.env.AMQP_USERNAME,
        password: process.env.AMQP_PASSWORD,
      },
    });
    microserviceApp.listen();

    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 8080;
    await app.listen(port);
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error('Error during bootstrap:', error);
  }
}

bootstrap();
