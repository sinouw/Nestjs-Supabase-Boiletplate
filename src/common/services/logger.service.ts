import { Injectable, Logger } from '@nestjs/common';

export interface LogMetadata {
  userId?: string;
  requestId?: string;
  action?: string;
  duration?: number;
  method?: string;
  path?: string;
  statusCode?: number;
  error?: any;
  [key: string]: any;
}

@Injectable()
export class CustomLoggerService extends Logger {
  private static requestId = 0;

  constructor(context?: string) {
    super(context);
  }

  private formatMessage(message: string, metadata?: LogMetadata): string {
    const timestamp = new Date().toISOString();
    const requestId =
      metadata?.requestId || `REQ-${CustomLoggerService.requestId++}`;

    let formattedMessage = `[${timestamp}] [${requestId}] ${message}`;

    if (metadata) {
      const metadataString = Object.entries(metadata)
        .filter(([key]) => key !== 'requestId' && metadata[key] !== undefined)
        .map(
          ([key, value]) =>
            `${key}=${typeof value === 'object' ? JSON.stringify(value) : value}`,
        )
        .join(' | ');

      if (metadataString) {
        formattedMessage += ` | ${metadataString}`;
      }
    }

    return formattedMessage;
  }

  override log(message: any, ...optionalParams: any[]) {
    const [metadata] = optionalParams;
    super.log(this.formatMessage(message, metadata as LogMetadata));
  }

  override error(message: any, ...optionalParams: any[]) {
    const [metadata] = optionalParams;
    const errorMetadata = {
      ...(metadata as LogMetadata),
      stack: (metadata as LogMetadata)?.error?.stack,
      errorMessage: (metadata as LogMetadata)?.error?.message,
    };
    super.error(this.formatMessage(message, errorMetadata));
  }

  override warn(message: any, ...optionalParams: any[]) {
    const [metadata] = optionalParams;
    super.warn(this.formatMessage(message, metadata as LogMetadata));
  }

  override debug(message: any, ...optionalParams: any[]) {
    const [metadata] = optionalParams;
    super.debug(this.formatMessage(message, metadata as LogMetadata));
  }

  override verbose(message: any, ...optionalParams: any[]) {
    const [metadata] = optionalParams;
    super.verbose(this.formatMessage(message, metadata as LogMetadata));
  }

  logRequest(metadata: LogMetadata) {
    const { duration, ...rest } = metadata;
    this.log(`HTTP ${metadata.method} ${metadata.path}`, {
      ...rest,
      durationMs: duration, // Store raw number
    });
  }

  logError(error: Error, metadata?: LogMetadata) {
    this.error('An error occurred', {
      ...metadata,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    });
  }

  logDatabaseQuery(query: string, duration: number, metadata?: LogMetadata) {
    this.debug('Database Query', {
      ...metadata,
      query,
      durationMs: duration, // Store raw number
    });
  }

  logAuth(action: string, metadata?: LogMetadata) {
    this.log(`Auth: ${action}`, metadata);
  }
}
