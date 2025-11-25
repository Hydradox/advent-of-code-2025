import { SafeAny } from '@/types';
import winston, { Logger } from 'winston';
import { logColors, logLevels } from './config';
import * as process from 'node:process';
import { AppError } from '@/lib/app-error';

class WinstonAdapter {

  private readonly logger: Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL ?? 'info',
      levels: logLevels,
      format: winston.format.json(),
      exitOnError: false,
    });

    // File
    this.logger.add(
      new winston.transports.File({
        filename: `${process.cwd()}/logs/application.log`,
        lazy: true,
        maxsize: 2 * 1024 * 1024, // 2MB
        maxFiles: 10, // Total: 20MB
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          // Print object as string
          winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}] ${message}`;
          }),
        ),
      }),
    );

    // Console
    this.logger.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize({ colors: logColors, level: true }),
          winston.format.timestamp({ format: 'HH:mm:ss.SSS' }),
          winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}] ${message}`;
          }),
        ),
      }),
    );

  }

  critical(...messages: SafeAny[]): void {
    this.logger.crit(messages.map((message: SafeAny) => this.parseLogMessage(message)).join(' '));
  }

  error(...messages: SafeAny[]): void {
    this.logger.error(messages.map((message: SafeAny) => this.parseLogMessage(message)).join(' '));
  }

  warning(...messages: SafeAny[]): void {
    this.logger.warn(messages.map((message: SafeAny) => this.parseLogMessage(message)).join(' '));
  }

  info(...messages: SafeAny[]): void {
    this.logger.info(messages.map((message: SafeAny) => this.parseLogMessage(message)).join(' '));
  }

  debug(...messages: SafeAny[]): void {
    this.logger.debug(messages.map((message: SafeAny) => this.parseLogMessage(message)).join(' '));
  }

  private parseLogMessage(message: SafeAny): string {

    if (typeof message === 'string')
      return message;

    if (message instanceof AppError)
      return `${message.toString()}\n`;

    if (message instanceof Error)
      return `${new AppError(message).toString()}\n`;

    if (message instanceof Date)
      return message.toUTCString();

    if (typeof message === 'function')
      return `Function: ${message.name}()\n${message.toString()}\n`;

    if (typeof message === 'symbol')
      return `Symbol: ${message.toString()}\n`;

    if (message === undefined)
      return 'undefined';

    if (typeof message === 'object')
      return `Object:\n${JSON.stringify(message, undefined, 2)}\n`;

    return message;
  }

}

const log = new WinstonAdapter();
export default log;
