import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type Workout = Database['public']['Tables']['workouts']['Row'];

// 获取运动计划列表
export const getWorkouts = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', req.user?.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取运动计划失败' });
  }
};

// 创建新的运动计划
export const createWorkout = async (req: Request, res: Response) => {
  try {
    const workoutData = {
      ...req.body,
      user_id: req.user?.id,
    };

    const { data, error } = await supabase
      .from('workouts')
      .insert(workoutData)
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: '创建运动计划失败' });
  }
};

// 获取特定运动计划
export const getWorkout = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('id', id)
      .eq('user_id', req.user?.id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: '运动计划不存在' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '获取运动计划失败' });
  }
};

// 更新运动计划
export const updateWorkout = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('workouts')
      .update(req.body)
      .eq('id', id)
      .eq('user_id', req.user?.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: '运动计划不存在' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: '更新运动计划失败' });
  }
};

// 删除运动计划
export const deleteWorkout = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('workouts')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user?.id);

    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: '删除运动计划失败' });
  }
};

// 获取用户的运动统计
export const getWorkoutStats = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { startDate, endDate } = req.query;

    let query = supabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId);

    if (startDate) {
      query = query.gte('created_at', startDate);
    }

    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { data, error } = await query;

    if (error) throw error;

    const stats = {
      totalWorkouts: data.length,
      totalDuration: data.reduce((sum: number, workout: Workout) => sum + workout.duration, 0),
      totalCaloriesBurned: data.reduce((sum: number, workout: Workout) => sum + (workout.calories_burned || 0), 0),
      workoutsByType: data.reduce((acc: Record<string, number>, workout: Workout) => {
        acc[workout.type] = (acc[workout.type] || 0) + 1;
        return acc;
      }, {}),
    };

    res.json(stats);
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Failed to get workout statistics',
    });
  }
}; 