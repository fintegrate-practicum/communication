import { createLogger, format, transports, Logger } from 'winston';
import { Papertrail } from 'winston-papertrail';
import { LoggerService } from '@nestjs/common';

// הגדרת הטרנספורטר ל-Papertrail
const papertrailTransport = new Papertrail({
  host: process.env.PAPERTRAIL_HOST || 'default_host',
  port: parseInt(process.env.PAPERTRAIL_PORT, 10) || 12345,
  logFormat: (level: string, message: string) => `${level}: ${message}`,
});

// הגדרת הלוגר
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }), // מאפשר ללוג של שגיאות להוסיף את ה-stack trace
    format.splat(), // תומך בפרמטרים מותאמים אישית
    format.json() // תומך בפורמט JSON ללוגים
  ),
  transports: [
    new transports.Console({ format: format.combine(format.colorize(), format.simple()) }),
    papertrailTransport
  ],
});

// מימוש של LoggerService עבור NestJS
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
