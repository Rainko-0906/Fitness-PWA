import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

// 创建营养记录
export const createNutrition = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const nutritionData = { ...req.body, user_id: userId };

    const { data, error } = await supabase
      .from('nutrition')
      .insert([nutritionData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Failed to create nutrition record',
    });
  }
};

// 获取用户的营养记录列表
export const getNutritionRecords = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { meal_type, startDate, endDate } = req.query;

    let query = supabase
      .from('nutrition')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (meal_type) {
      query = query.eq('meal_type', meal_type);
    }

    if (startDate) {
      query = query.gte('created_at', startDate);
    }

    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json(data);
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Failed to get nutrition records',
    });
  }
};

// 获取单个营养记录详情
export const getNutrition = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const { data, error } = await supabase
      .from('nutrition')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Nutrition record not found' });
    }

    res.json(data);
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Failed to get nutrition record',
    });
  }
};

// 更新营养记录
export const updateNutrition = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const updates = req.body;

    const { data, error } = await supabase
      .from('nutrition')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Nutrition record not found' });
    }

    res.json(data);
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Failed to update nutrition record',
    });
  }
};

// 删除营养记录
export const deleteNutrition = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const { error } = await supabase
      .from('nutrition')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;

    res.json({ message: 'Nutrition record deleted successfully' });
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Failed to delete nutrition record',
    });
  }
};

// 获取用户的营养统计
export const getNutritionStats = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { startDate, endDate } = req.query;

    let query = supabase
      .from('nutrition')
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
      totalMeals: data.length,
      totalCalories: data.reduce((sum, meal) => sum + meal.calories, 0),
      totalNutrients: {
        protein: data.reduce((sum, meal) => sum + (meal.protein || 0), 0),
        carbs: data.reduce((sum, meal) => sum + (meal.carbs || 0), 0),
        fat: data.reduce((sum, meal) => sum + (meal.fat || 0), 0),
        fiber: data.reduce((sum, meal) => sum + (meal.fiber || 0), 0),
        sugar: data.reduce((sum, meal) => sum + (meal.sugar || 0), 0),
      },
      mealsByType: data.reduce((acc: any, meal) => {
        acc[meal.meal_type] = (acc[meal.meal_type] || 0) + 1;
        return acc;
      }, {}),
    };

    res.json(stats);
  } catch (error: any) {
    res.status(400).json({
      error: error.message || 'Failed to get nutrition statistics',
    });
  }
}; 