import { mockUser, mockWorkouts, mockNutrition, mockGoals } from '../mock/data';

// 类型定义
export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  fitness_level?: string;
  goals?: string[];
}

export interface Workout {
  id: string;
  type: string;
  duration: number;
  calories_burned: number;
  date: string;
  notes?: string;
}

export interface Nutrition {
  id: string;
  meal_type: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
  notes?: string;
}

export interface Goal {
  id: string;
  type: string;
  target: number;
  current: number;
  deadline?: string;
  status: string;
}

// 错误处理
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// 模拟 API 延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API 响应包装器
const wrapResponse = async <T>(promise: Promise<T>): Promise<T> => {
  try {
    return await promise;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, '服务器错误');
  }
};

export const api = {
  // 用户相关
  getUser: () => wrapResponse(
    delay(500).then(() => mockUser)
  ),
  updateUser: (data: Partial<User>) => wrapResponse(
    delay(500).then(() => ({ ...mockUser, ...data }))
  ),

  // 训练相关
  getWorkouts: () => wrapResponse(
    delay(500).then(() => mockWorkouts)
  ),
  createWorkout: (data: Omit<Workout, 'id'>) => wrapResponse(
    delay(500).then(() => ({ ...data, id: Date.now().toString() }))
  ),
  updateWorkout: (id: string, data: Partial<Workout>) => wrapResponse(
    delay(500).then(() => ({ ...mockWorkouts.find(w => w.id === id)!, ...data }))
  ),
  deleteWorkout: (id: string) => wrapResponse(
    delay(500).then(() => true)
  ),

  // 营养相关
  getNutrition: () => wrapResponse(
    delay(500).then(() => mockNutrition)
  ),
  createNutrition: (data: Omit<Nutrition, 'id'>) => wrapResponse(
    delay(500).then(() => ({ ...data, id: Date.now().toString() }))
  ),
  updateNutrition: (id: string, data: Partial<Nutrition>) => wrapResponse(
    delay(500).then(() => ({ ...mockNutrition.find(n => n.id === id)!, ...data }))
  ),
  deleteNutrition: (id: string) => wrapResponse(
    delay(500).then(() => true)
  ),

  // 目标相关
  getGoals: () => wrapResponse(
    delay(500).then(() => mockGoals)
  ),
  createGoal: (data: Omit<Goal, 'id'>) => wrapResponse(
    delay(500).then(() => ({ ...data, id: Date.now().toString() }))
  ),
  updateGoal: (id: string, data: Partial<Goal>) => wrapResponse(
    delay(500).then(() => ({ ...mockGoals.find(g => g.id === id)!, ...data }))
  ),
  deleteGoal: (id: string) => wrapResponse(
    delay(500).then(() => true)
  )
}; 