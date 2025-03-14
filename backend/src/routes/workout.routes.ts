import { Router } from 'express';
import {
  getWorkouts,
  createWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
} from '../controllers/workout.controller';

const router = Router();

// 训练计划路由
router.get('/', getWorkouts);
router.post('/', createWorkout);
router.get('/:id', getWorkout);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

export default router; 