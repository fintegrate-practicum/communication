import { createLogger, format, transports } from 'winston';
import { Papertrail } from 'winston-papertrail';

const papertrailTransport = new Papertrail({
  host: process.env.PAPERTRAIL_HOST,
  port: process.env.PAPERTRAIL_PORT,
  logFormat: (level: string, message: string) => `${level}: ${message}`,
});


const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.simple()
  ),
  transports: [
    new transports.Console(),
    papertrailTransport
  ],
});

export default logger;
