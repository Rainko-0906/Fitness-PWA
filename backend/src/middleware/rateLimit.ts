import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { AppError } from '../utils/errors';

// 通用速率限制
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 15分钟内最多100个请求
  message: '请求过于频繁，请稍后再试',
  handler: (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(429, '请求过于频繁，请稍后再试'));
  },
});

// 认证相关接口的速率限制
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1小时
  max: 5, // 限制每个IP 1小时内最多5次尝试
  message: '登录尝试次数过多，请稍后再试',
  handler: (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(429, '登录尝试次数过多，请稍后再试'));
  },
});

// AI 接口的速率限制
export const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1小时
  max: 10, // 限制每个IP 1小时内最多10次请求
  message: 'AI 服务请求次数过多，请稍后再试',
  handler: (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(429, 'AI 服务请求次数过多，请稍后再试'));
  },
}); 