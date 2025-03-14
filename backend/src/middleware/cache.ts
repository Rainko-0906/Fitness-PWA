import { Request, Response, NextFunction } from 'express';
import { cache } from '../utils/cache';

export const cacheMiddleware = (ttl: number = 3600) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 只缓存 GET 请求
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl}`;
    const cachedData = cache.get(key);

    if (cachedData) {
      return res.json(cachedData);
    }

    // 重写 res.json 方法以缓存响应
    const originalJson = res.json;
    res.json = function (data: any) {
      cache.set(key, data, ttl);
      return originalJson.call(this, data);
    };

    next();
  };
}; 