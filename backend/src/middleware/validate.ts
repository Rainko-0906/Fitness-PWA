import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// 用户信息验证模式
const userUpdateSchema = z.object({
  name: z.string().min(2, '名字至少需要2个字符').max(50, '名字不能超过50个字符').optional(),
  avatar_url: z.string().url('无效的头像URL').optional(),
  height: z.number().min(100, '身高不能小于100cm').max(250, '身高不能大于250cm').optional(),
  weight: z.number().min(30, '体重不能小于30kg').max(300, '体重不能大于300kg').optional(),
  fitness_level: z.enum(['beginner', 'intermediate', 'advanced'], {
    errorMap: () => ({ message: '健身水平必须是 beginner、intermediate 或 advanced' }),
  }).optional(),
  goals: z.array(z.string()).optional(),
});

// 训练记录验证模式
const workoutSchema = z.object({
  type: z.string().min(1, '训练类型不能为空'),
  title: z.string().min(1, '标题不能为空').max(100, '标题不能超过100个字符'),
  duration: z.number().min(1, '训练时长必须大于0分钟'),
  calories_burned: z.number().min(0, '消耗卡路里不能为负数'),
  date: z.string().datetime('无效的日期格式'),
  completed: z.boolean().optional(),
  notes: z.string().max(500, '备注不能超过500个字符').optional(),
});

// 营养记录验证模式
const nutritionSchema = z.object({
  type: z.string().min(1, '类型不能为空'),
  name: z.string().min(1, '名称不能为空').max(100, '名称不能超过100个字符'),
  calories: z.number().min(0, '卡路里不能为负数'),
  protein: z.number().min(0, '蛋白质不能为负数'),
  carbs: z.number().min(0, '碳水化合物不能为负数'),
  fat: z.number().min(0, '脂肪不能为负数'),
  date: z.string().datetime('无效的日期格式'),
  notes: z.string().max(500, '备注不能超过500个字符').optional(),
});

// 目标验证模式
const goalSchema = z.object({
  type: z.string().min(1, '目标类型不能为空'),
  target_value: z.number().min(0, '目标值不能为负数'),
  current_value: z.number().min(0, '当前值不能为负数'),
  start_date: z.string().datetime('无效的开始日期格式'),
  end_date: z.string().datetime('无效的结束日期格式'),
  notes: z.string().max(500, '备注不能超过500个字符').optional(),
});

// 训练计划请求验证
const workoutPlanSchema = z.object({
  height: z.number().min(100).max(250),
  weight: z.number().min(30).max(300),
  fitness_level: z.enum(['beginner', 'intermediate', 'advanced']),
  goals: z.array(z.string()),
});

// 营养建议请求验证
const nutritionAdviceSchema = z.object({
  height: z.number().min(100).max(250),
  weight: z.number().min(30).max(300),
  goals: z.array(z.string()),
});

// 进度分析请求验证
const progressAnalysisSchema = z.object({
  workouts: z.array(z.object({
    type: z.string(),
    duration: z.number().min(1),
    calories_burned: z.number().min(0),
    date: z.string(),
  })),
  nutrition: z.array(z.object({
    calories: z.number().min(0),
    protein: z.number().min(0),
    carbs: z.number().min(0),
    fat: z.number().min(0),
    date: z.string(),
  })),
  goals: z.array(z.object({
    type: z.string(),
    target_value: z.number(),
    current_value: z.number(),
    start_date: z.string(),
    end_date: z.string(),
    completed: z.boolean(),
  })),
});

// 验证中间件
export const validateUserUpdate = (req: Request, res: Response, next: NextFunction) => {
  try {
    userUpdateSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      res.status(500).json({ error: '验证失败' });
    }
  }
};

export const validateWorkout = (req: Request, res: Response, next: NextFunction) => {
  try {
    workoutSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      res.status(500).json({ error: '验证失败' });
    }
  }
};

export const validateNutrition = (req: Request, res: Response, next: NextFunction) => {
  try {
    nutritionSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      res.status(500).json({ error: '验证失败' });
    }
  }
};

export const validateGoal = (req: Request, res: Response, next: NextFunction) => {
  try {
    goalSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      res.status(500).json({ error: '验证失败' });
    }
  }
};

export const validateWorkoutPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await workoutPlanSchema.parseAsync(req.body);
    next();
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      res.status(500).json({ error: '验证失败' });
    }
  }
};

export const validateNutritionAdvice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await nutritionAdviceSchema.parseAsync(req.body);
    next();
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      res.status(500).json({ error: '验证失败' });
    }
  }
};

export const validateProgressAnalysis = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await progressAnalysisSchema.parseAsync(req.body);
    next();
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      res.status(500).json({ error: '验证失败' });
    }
  }
}; 