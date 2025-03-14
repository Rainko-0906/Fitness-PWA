import { Router } from 'express';
import {
  register,
  login,
  resetPassword,
  verifyEmail,
  getUserProfile,
  updateUserProfile,
} from '../controllers/user.controller';

const router = Router();

// 认证路由
router.post('/register', register);
router.post('/login', login);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);

// 用户信息路由
router.get('/:id', getUserProfile);
router.put('/:id', updateUserProfile);

export default router; 