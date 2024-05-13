import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitConsumerService } from './services/rabbit-consumer/rabbit-consumer.service';
import { EmailModule } from './modules/email.module';
import { EmailService } from './services/email.service';

@Module({
  imports: [EmailModule],
  controllers: [AppController],
  providers: [RabbitConsumerService, AppService, EmailService],
})
export class AppModule {}
