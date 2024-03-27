import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitPublisherService } from './rabbit-publisher/rabbit-publisher.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RabbitPublisherService],
})
export class AppModule {}
