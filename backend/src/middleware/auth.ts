import { Response, NextFunction } from 'express';
import { auth as firebaseAuth } from 'firebase-admin';
import { supabase } from '../lib/supabase';
import { AuthRequest } from '../types/auth';

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: '未提供认证令牌' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await firebaseAuth().verifyIdToken(token);

    // 验证用户是否存在于 Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('firebase_uid', decodedToken.uid)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: '用户未找到' });
    }

    req.user = {
      id: decodedToken.uid,
      email: decodedToken.email || undefined,
      role: user.role
    };

    next();
  } catch (error) {
    console.error('认证错误:', error);
    res.status(401).json({ error: '认证失败' });
  }
}; 