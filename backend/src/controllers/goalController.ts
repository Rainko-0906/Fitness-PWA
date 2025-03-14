import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email?: string;
    role?: string;
  };
}

export const getGoals = async (req: AuthRequest, res: Response) => {
  try {
    const { data: goals, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', req.user?.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(goals);
  } catch (error) {
    console.error('获取目标失败:', error);
    res.status(500).json({ error: '获取目标失败' });
  }
};

export const createGoal = async (req: AuthRequest, res: Response) => {
  try {
    const goal = {
      user_id: req.user?.id,
      type: req.body.type,
      target_value: req.body.target_value,
      current_value: req.body.current_value || 0,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      completed: false,
      notes: req.body.notes,
    };

    const { data, error } = await supabase
      .from('goals')
      .insert(goal)
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('创建目标失败:', error);
    res.status(500).json({ error: '创建目标失败' });
  }
};

export const updateGoal = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = {
      type: req.body.type,
      target_value: req.body.target_value,
      current_value: req.body.current_value,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      completed: req.body.completed,
      notes: req.body.notes,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('goals')
      .update(updates)
      .eq('id', id)
      .eq('user_id', req.user?.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: '目标未找到' });
    }

    res.json(data);
  } catch (error) {
    console.error('更新目标失败:', error);
    res.status(500).json({ error: '更新目标失败' });
  }
};

export const deleteGoal = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user?.id);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    console.error('删除目标失败:', error);
    res.status(500).json({ error: '删除目标失败' });
  }
}; 