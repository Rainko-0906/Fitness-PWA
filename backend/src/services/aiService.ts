import { AppError } from '../utils/errors';

interface UserProfile {
  height: number;
  weight: number;
  fitness_level: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
}

interface WorkoutRecord {
  type: string;
  duration: number;
  calories_burned: number;
  date: string;
}

interface NutritionRecord {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
}

interface Goal {
  type: string;
  target_value: number;
  current_value: number;
  start_date: string;
  end_date: string;
  completed: boolean;
}

type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  rest: number;
  notes: string;
}

interface ExerciseMap {
  [key: string]: Exercise[];
}

interface DurationMap {
  [key: string]: number;
}

export class AIService {
  // 生成个性化训练计划
  static async generateWorkoutPlan(user: UserProfile) {
    try {
      // 基于用户信息生成基础训练计划
      const exercises = this.getExercisesByLevel(user.fitness_level);
      const duration = this.getDurationByLevel(user.fitness_level);
      
      return {
        plan: {
          exercises,
          duration,
          difficulty: user.fitness_level,
        },
      };
    } catch (error) {
      throw new AppError(500, '生成训练计划失败');
    }
  }

  // 生成营养建议
  static async generateNutritionAdvice(user: UserProfile) {
    try {
      // 计算基础代谢率 (BMR)
      const bmr = this.calculateBMR(user.height, user.weight);
      // 根据目标调整卡路里
      const dailyCalories = this.adjustCaloriesByGoals(bmr, user.goals);
      
      return {
        advice: {
          daily_calories: dailyCalories,
          macros: this.calculateMacros(dailyCalories),
          recommendations: this.getNutritionRecommendations(user.goals),
        },
      };
    } catch (error) {
      throw new AppError(500, '生成营养建议失败');
    }
  }

  // 分析进度
  static async analyzeProgress(
    workouts: WorkoutRecord[],
    nutrition: NutritionRecord[],
    goals: Goal[]
  ) {
    try {
      return {
        analysis: {
          workout_progress: this.analyzeWorkoutProgress(workouts),
          nutrition_progress: this.analyzeNutritionProgress(nutrition),
          goal_progress: this.analyzeGoalProgress(goals),
        },
      };
    } catch (error) {
      throw new AppError(500, '分析进度失败');
    }
  }

  // 私有辅助方法
  private static getExercisesByLevel(level: FitnessLevel): Exercise[] {
    const exercises: ExerciseMap = {
      beginner: [
        { name: '俯卧撑', sets: 3, reps: 10, rest: 60, notes: '保持背部挺直' },
        { name: '深蹲', sets: 3, reps: 12, rest: 60, notes: '膝盖不要超过脚尖' },
        { name: '平板支撑', sets: 3, reps: 30, rest: 60, notes: '保持身体成一条直线' },
      ],
      intermediate: [
        { name: '俯卧撑', sets: 4, reps: 15, rest: 45, notes: '增加难度可以尝试钻石俯卧撑' },
        { name: '深蹲', sets: 4, reps: 15, rest: 45, notes: '可以尝试负重深蹲' },
        { name: '平板支撑', sets: 4, reps: 45, rest: 45, notes: '可以尝试侧平板' },
      ],
      advanced: [
        { name: '俯卧撑', sets: 5, reps: 20, rest: 30, notes: '尝试爆发式俯卧撑' },
        { name: '深蹲', sets: 5, reps: 20, rest: 30, notes: '尝试跳跃深蹲' },
        { name: '平板支撑', sets: 5, reps: 60, rest: 30, notes: '尝试动态平板支撑' },
      ],
    };

    return exercises[level] || exercises.beginner;
  }

  private static getDurationByLevel(level: FitnessLevel): number {
    const durations: DurationMap = {
      beginner: 30,
      intermediate: 45,
      advanced: 60,
    };
    return durations[level] || 30;
  }

  private static calculateBMR(height: number, weight: number): number {
    // 使用 Mifflin-St Jeor 公式计算 BMR
    return (10 * weight) + (6.25 * height) - 5;
  }

  private static adjustCaloriesByGoals(bmr: number, goals: string[]): number {
    let multiplier = 1.2; // 基础活动系数

    if (goals.includes('增重')) {
      multiplier += 0.2;
    } else if (goals.includes('减重')) {
      multiplier -= 0.2;
    }

    return Math.round(bmr * multiplier);
  }

  private static calculateMacros(calories: number) {
    return {
      protein: Math.round(calories * 0.3 / 4), // 30% 蛋白质
      carbs: Math.round(calories * 0.4 / 4),   // 40% 碳水化合物
      fat: Math.round(calories * 0.3 / 9),     // 30% 脂肪
    };
  }

  private static getNutritionRecommendations(goals: string[]): string[] {
    const recommendations = [];
    
    if (goals.includes('增重')) {
      recommendations.push('增加优质蛋白质摄入');
      recommendations.push('适当增加碳水化合物摄入');
    } else if (goals.includes('减重')) {
      recommendations.push('控制总热量摄入');
      recommendations.push('增加蛋白质摄入以保持肌肉量');
    }

    recommendations.push('保持充足的水分摄入');
    recommendations.push('注意营养均衡');

    return recommendations;
  }

  private static analyzeWorkoutProgress(workouts: WorkoutRecord[]) {
    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
    const totalCalories = workouts.reduce((sum, w) => sum + w.calories_burned, 0);

    const improvements = [];
    if (totalWorkouts > 0) {
      improvements.push(`已完成 ${totalWorkouts} 次训练`);
      improvements.push(`总训练时长 ${totalDuration} 分钟`);
      improvements.push(`总消耗热量 ${totalCalories} 千卡`);
    }

    return {
      total_workouts: totalWorkouts,
      total_duration: totalDuration,
      total_calories: totalCalories,
      improvements,
    };
  }

  private static analyzeNutritionProgress(nutrition: NutritionRecord[]) {
    if (nutrition.length === 0) {
      return {
        average_calories: 0,
        macro_balance: { protein: 0, carbs: 0, fat: 0 },
        recommendations: ['开始记录饮食数据以获取分析'],
      };
    }

    const avgCalories = nutrition.reduce((sum, n) => sum + n.calories, 0) / nutrition.length;
    const avgProtein = nutrition.reduce((sum, n) => sum + n.protein, 0) / nutrition.length;
    const avgCarbs = nutrition.reduce((sum, n) => sum + n.carbs, 0) / nutrition.length;
    const avgFat = nutrition.reduce((sum, n) => sum + n.fat, 0) / nutrition.length;

    return {
      average_calories: Math.round(avgCalories),
      macro_balance: {
        protein: Math.round(avgProtein),
        carbs: Math.round(avgCarbs),
        fat: Math.round(avgFat),
      },
      recommendations: this.getNutritionRecommendations([]),
    };
  }

  private static analyzeGoalProgress(goals: Goal[]) {
    const completedGoals = goals.filter(g => g.completed).length;
    const inProgressGoals = goals.filter(g => !g.completed).length;

    const suggestions = [];
    if (completedGoals > 0) {
      suggestions.push(`已完成 ${completedGoals} 个目标`);
    }
    if (inProgressGoals > 0) {
      suggestions.push(`还有 ${inProgressGoals} 个目标正在进行中`);
    }

    return {
      completed_goals: completedGoals,
      in_progress_goals: inProgressGoals,
      suggestions,
    };
  }
} 