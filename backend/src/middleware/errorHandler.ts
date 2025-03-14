import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

interface ErrorResponse {
  status: 'error' | 'fail';
  message: string;
  errors?: any[];
  stack?: string;
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  // 处理其他类型的错误
  console.error('未处理的错误:', err);
  return res.status(500).json({
    status: 'error',
    message: '服务器内部错误',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}; 