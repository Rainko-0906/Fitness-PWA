import { Router } from 'express';
import {
  createNutrition,
  getNutritionRecords,
  getNutrition,
  updateNutrition,
  deleteNutrition,
  getNutritionStats,
} from '../controllers/nutrition.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

// 所有路由都需要认证
router.use(verifyToken);

// 营养记录路由
router.post('/', createNutrition);
router.get('/', getNutritionRecords);
router.get('/stats', getNutritionStats);
router.get('/:id', getNutrition);
router.put('/:id', updateNutrition);
router.delete('/:id', deleteNutrition);

export default router; 