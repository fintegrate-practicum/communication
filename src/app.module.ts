import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './modules/email.module';
import { EmailService } from './services/email/email.service';

@Module({
  imports: [EmailModule],
  controllers: [AppController],
  providers: [AppService, EmailService]

})
export class AppModule { }
