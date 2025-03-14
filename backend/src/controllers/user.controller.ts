import { Request, Response } from 'express';
import { auth } from 'firebase-admin';
import { createClient } from '@supabase/supabase-js';

// 初始化 Supabase 客户端
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // 创建 Firebase 用户
    const userRecord = await auth().createUser({
      email,
      password,
      displayName: name,
    });

    // 在 Supabase 中创建用户记录
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: userRecord.uid,
          email,
          name,
          created_at: new Date(),
        },
      ]);

    if (error) throw error;

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: userRecord.uid,
        email: userRecord.email,
        name: userRecord.displayName,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Registration failed',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 验证用户凭据
    const userRecord = await auth().getUserByEmail(email);

    // 生成自定义令牌
    const token = await auth().createCustomToken(userRecord.uid);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: userRecord.uid,
        email: userRecord.email,
        name: userRecord.displayName,
      },
    });
  } catch (error: any) {
    res.status(401).json({
      error: 'Invalid credentials',
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // 发送密码重置邮件
    await auth().generatePasswordResetLink(email);

    res.json({
      message: 'Password reset email sent',
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Password reset failed',
    });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // 发送邮箱验证链接
    await auth().generateEmailVerificationLink(email);

    res.json({
      message: 'Email verification link sent',
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Email verification failed',
    });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 从 Supabase 获取用户信息
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json(user);
  } catch (error: any) {
    res.status(404).json({
      error: error.message || 'User not found',
    });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // 更新 Firebase 用户信息
    await auth().updateUser(id, {
      displayName: updates.name,
      photoURL: updates.avatar,
    });

    // 更新 Supabase 用户信息
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id);

    if (error) throw error;

    res.json({
      message: 'Profile updated successfully',
      user: data,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Profile update failed',
    });
  }
}; 