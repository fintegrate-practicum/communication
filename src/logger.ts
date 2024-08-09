import { createLogger, format, transports, Logger } from 'winston';
import { Papertrail } from 'winston-papertrail';
import { LoggerService } from '@nestjs/common';

const papertrailTransport = new Papertrail({
  host: process.env.PAPERTRAIL_HOST,
  port: process.env.PAPERTRAIL_PORT,
  logFormat: (level: string, message: string) => `${level}: ${message}`,
});

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.simple()),
  transports: [new transports.Console(), papertrailTransport],
});

class PapertrailLogger implements LoggerService {
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

export { logger, PapertrailLogger };
