import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Performance and security focused logger aligned with project requirements
export interface LogContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  campaignId?: string;
  paymentId?: string;
  amount?: number;
  currency?: string;
  ip?: string;
  userAgent?: string;
  performance?: PerformanceLogData;
  security?: SecurityLogData;
  accessibility?: AccessibilityLogData;
  [key: string]: any;
}

export interface PerformanceLogData {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  apiResponseTime?: number;
  dbQueryTime?: number;
  cacheHit?: boolean;
}

export interface SecurityLogData {
  action: string;
  resource?: string;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  fraudScore?: number;
  blocked?: boolean;
}

export interface AccessibilityLogData {
  feature: string;
  assistiveTechnology?: string;
  success: boolean;
  errorDetails?: string;
}

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  VERBOSE = 'verbose'
}

export class MerajutLogger {
  private winston: winston.Logger;
  private service: string;
  private version: string;

  constructor(service: string, version: string = '1.0.0') {
    this.service = service;
    this.version = version;
    this.winston = this.createLogger();
  }

  private createLogger(): winston.Logger {
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    const transports: winston.transport[] = [
      // Console transport for development
      new winston.transports.Console({
        level: isDevelopment ? 'debug' : 'info',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.printf(({ timestamp, level, message, ...meta }) => {
            return `${timestamp} [${level}] ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
          })
        )
      })
    ];

    // File transports for production
    if (!isDevelopment) {
      // General application logs
      transports.push(
        new DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'info'
        })
      );

      // Error logs
      transports.push(
        new DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '30d',
          level: 'error'
        })
      );

      // Performance logs
      transports.push(
        new DailyRotateFile({
          filename: 'logs/performance-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '7d',
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
            winston.format.printf((info) => {
              // Only log performance-related entries to this file
              if (info.context?.performance) {
                return JSON.stringify(info);
              }
              return '';
            })
          )
        })
      );

      // Security logs
      transports.push(
        new DailyRotateFile({
          filename: 'logs/security-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '90d', // Keep security logs longer
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
            winston.format.printf((info) => {
              // Only log security-related entries to this file
              if (info.context?.security) {
                return JSON.stringify(info);
              }
              return '';
            })
          )
        })
      );
    }

    return winston.createLogger({
      level: isDevelopment ? 'debug' : 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.printf((info) => {
          const { timestamp, level, message, context, ...meta } = info;
          
          const logEntry = {
            timestamp,
            level,
            service: this.service,
            version: this.version,
            message,
            context,
            ...meta
          };

          return JSON.stringify(logEntry);
        })
      ),
      transports,
      // Don't exit on handled exceptions
      exitOnError: false
    });
  }

  // Core logging methods
  public error(message: string, context?: LogContext, error?: Error): void {
    this.winston.error(message, { 
      context, 
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : undefined 
    });
  }

  public warn(message: string, context?: LogContext): void {
    this.winston.warn(message, { context });
  }

  public info(message: string, context?: LogContext): void {
    this.winston.info(message, { context });
  }

  public debug(message: string, context?: LogContext): void {
    this.winston.debug(message, { context });
  }

  // Specialized logging methods aligned with project requirements
  public performance(message: string, performanceData: PerformanceLogData, context?: Omit<LogContext, 'performance'>): void {
    this.info(message, { 
      ...context, 
      performance: performanceData 
    });
  }

  public security(message: string, securityData: SecurityLogData, context?: Omit<LogContext, 'security'>): void {
    this.winston.log(securityData.riskLevel === 'critical' ? 'error' : 'warn', message, { 
      ...context, 
      security: securityData 
    });
  }

  public accessibility(message: string, accessibilityData: AccessibilityLogData, context?: Omit<LogContext, 'accessibility'>): void {
    this.winston.log(accessibilityData.success ? 'info' : 'warn', message, { 
      ...context, 
      accessibility: accessibilityData 
    });
  }

  // Web Vitals logging for performance budget compliance
  public webVitals(vitals: PerformanceLogData, context?: LogContext): void {
    const budgetViolations: string[] = [];
    
    // Check against performance budgets from technical blueprint
    if (vitals.lcp && vitals.lcp > 1500) budgetViolations.push(`LCP: ${vitals.lcp}ms > 1500ms budget`);
    if (vitals.fid && vitals.fid > 100) budgetViolations.push(`FID: ${vitals.fid}ms > 100ms budget`);
    if (vitals.cls && vitals.cls > 0.1) budgetViolations.push(`CLS: ${vitals.cls} > 0.1 budget`);
    if (vitals.ttfb && vitals.ttfb > 200) budgetViolations.push(`TTFB: ${vitals.ttfb}ms > 200ms budget`);

    const level = budgetViolations.length > 0 ? 'warn' : 'info';
    const message = budgetViolations.length > 0 
      ? `Performance budget violations detected: ${budgetViolations.join(', ')}`
      : 'Web Vitals measured';

    this.winston.log(level, message, {
      context: {
        ...context,
        performance: vitals
      },
      budgetViolations
    });
  }

  // Campaign-specific logging for transparency reporting
  public campaignAction(action: string, campaignId: string, amount?: number, context?: LogContext): void {
    this.info(`Campaign action: ${action}`, {
      ...context,
      campaignId,
      amount
    });
  }

  // Payment logging for financial transparency and audit
  public payment(action: string, paymentId: string, amount: number, currency: string, context?: LogContext): void {
    this.info(`Payment action: ${action}`, {
      ...context,
      paymentId,
      amount,
      currency
    });
  }

  // User action logging for community engagement tracking
  public userAction(action: string, userId: string, context?: LogContext): void {
    this.info(`User action: ${action}`, {
      ...context,
      userId
    });
  }

  // API request logging with performance metrics
  public apiRequest(method: string, path: string, statusCode: number, responseTime: number, context?: LogContext): void {
    const level = statusCode >= 400 ? 'warn' : 'info';
    const budgetViolation = responseTime > 200; // API response budget from blueprint
    
    this.winston.log(level, `API ${method} ${path} - ${statusCode} (${responseTime}ms)`, {
      context: {
        ...context,
        performance: {
          apiResponseTime: responseTime
        }
      },
      method,
      path,
      statusCode,
      budgetViolation
    });
  }
}

// Default logger instance
const defaultLogger = new MerajutLogger('merajut-asa');

// Export convenience functions for quick usage
export const log = {
  error: (message: string, context?: LogContext, error?: Error) => defaultLogger.error(message, context, error),
  warn: (message: string, context?: LogContext) => defaultLogger.warn(message, context),
  info: (message: string, context?: LogContext) => defaultLogger.info(message, context),
  debug: (message: string, context?: LogContext) => defaultLogger.debug(message, context),
  performance: (message: string, performanceData: PerformanceLogData, context?: Omit<LogContext, 'performance'>) => 
    defaultLogger.performance(message, performanceData, context),
  security: (message: string, securityData: SecurityLogData, context?: Omit<LogContext, 'security'>) => 
    defaultLogger.security(message, securityData, context),
  accessibility: (message: string, accessibilityData: AccessibilityLogData, context?: Omit<LogContext, 'accessibility'>) => 
    defaultLogger.accessibility(message, accessibilityData, context),
  webVitals: (vitals: PerformanceLogData, context?: LogContext) => defaultLogger.webVitals(vitals, context),
  campaignAction: (action: string, campaignId: string, amount?: number, context?: LogContext) => 
    defaultLogger.campaignAction(action, campaignId, amount, context),
  payment: (action: string, paymentId: string, amount: number, currency: string, context?: LogContext) => 
    defaultLogger.payment(action, paymentId, amount, currency, context),
  userAction: (action: string, userId: string, context?: LogContext) => 
    defaultLogger.userAction(action, userId, context),
  apiRequest: (method: string, path: string, statusCode: number, responseTime: number, context?: LogContext) => 
    defaultLogger.apiRequest(method, path, statusCode, responseTime, context)
};

export { MerajutLogger as Logger };
export default defaultLogger;
