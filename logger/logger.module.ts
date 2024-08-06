import { Module } from '@nestjs/common';
import { PapertrailLogger } from './logger.service';

@Module({
  providers: [PapertrailLogger],
  exports: [PapertrailLogger],
})
export class LoggerModule {}
