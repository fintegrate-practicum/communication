import { LoggerService, Injectable } from '@nestjs/common';
import logger from './logger'; 

@Injectable()
export class PapertrailLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    logger.info(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    logger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    logger.warn(message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    logger.debug(message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    logger.verbose(message, ...optionalParams);
  }
}
