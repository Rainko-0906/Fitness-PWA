import { Router } from 'express';
import { auth } from '../middleware/auth';
import { generalLimiter, authLimiter, aiLimiter } from '../middleware/rateLimit';
import { cacheMiddleware } from '../middleware/cache';
import userRoutes from './userRoutes';
import workoutRoutes from './workoutRoutes';
import nutritionRoutes from './nutritionRoutes';
import goalRoutes from './goalRoutes';
import aiRoutes from './aiRoutes';

const router = Router();

// 应用通用速率限制
router.use(generalLimiter);

// 公开路由
router.use('/auth', authLimiter, auth);

// 需要认证的路由
router.use('/users', auth, cacheMiddleware(300), userRoutes); // 缓存5分钟
router.use('/workouts', auth, cacheMiddleware(300), workoutRoutes); // 缓存5分钟
router.use('/nutrition', auth, cacheMiddleware(300), nutritionRoutes); // 缓存5分钟
router.use('/goals', auth, cacheMiddleware(300), goalRoutes); // 缓存5分钟
router.use('/ai', auth, aiLimiter, aiRoutes); // AI 路由使用特殊的速率限制

export default router; 