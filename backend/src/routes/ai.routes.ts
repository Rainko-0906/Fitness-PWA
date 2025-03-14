import { Router } from 'express';
import {
  generateWorkoutPlan,
  generateNutritionAdvice,
  analyzeWorkoutProgress,
} from '../controllers/ai.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

// 所有路由都需要认证
router.use(verifyToken);

// AI服务路由
router.post('/workout-plan', generateWorkoutPlan);
router.post('/nutrition-advice', generateNutritionAdvice);
router.post('/analyze-progress', analyzeWorkoutProgress);

export default router; 