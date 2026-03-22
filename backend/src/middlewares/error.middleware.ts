import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '@/core/errors';

export const errorMiddleware = (
  error: Error | AppError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Protocol Error';
  let errors: any[] | undefined;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof ZodError) {
    statusCode = 422;
    message = 'Validation Protocol Failure';
    errors = error.issues.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
  } else if (error instanceof Error) {
    message = error.message;
  }

  // Development Logging
  if (process.env.NODE_ENV === 'development') {
    console.error('🛑 [Error Log]:', {
      method: req.method,
      url: req.url,
      message: error.message,
      stack: error.stack
    });
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    errors,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};
