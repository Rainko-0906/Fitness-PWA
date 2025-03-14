import request from 'supertest';
import app from '../app';
import { AIService } from '../services/aiService';

type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

interface UserProfile {
  height: number;
  weight: number;
  fitness_level: FitnessLevel;
  goals: string[];
}

describe('AI 服务测试', () => {
  describe('训练计划生成', () => {
    it('应该为初学者生成合适的训练计划', async () => {
      const userProfile: UserProfile = {
        height: 170,
        weight: 70,
        fitness_level: 'beginner',
        goals: ['增重', '增肌'],
      };

      const plan = await AIService.generateWorkoutPlan(userProfile);
      expect(plan.plan).toBeDefined();
      expect(plan.plan.exercises).toHaveLength(3);
      expect(plan.plan.duration).toBe(30);
      expect(plan.plan.difficulty).toBe('beginner');
    });

    it('应该为中级者生成合适的训练计划', async () => {
      const userProfile: UserProfile = {
        height: 170,
        weight: 70,
        fitness_level: 'intermediate',
        goals: ['增重', '增肌'],
      };

      const plan = await AIService.generateWorkoutPlan(userProfile);
      expect(plan.plan).toBeDefined();
      expect(plan.plan.exercises).toHaveLength(3);
      expect(plan.plan.duration).toBe(45);
      expect(plan.plan.difficulty).toBe('intermediate');
    });

    it('应该为高级者生成合适的训练计划', async () => {
      const userProfile: UserProfile = {
        height: 170,
        weight: 70,
        fitness_level: 'advanced',
        goals: ['增重', '增肌'],
      };

      const plan = await AIService.generateWorkoutPlan(userProfile);
      expect(plan.plan).toBeDefined();
      expect(plan.plan.exercises).toHaveLength(3);
      expect(plan.plan.duration).toBe(60);
      expect(plan.plan.difficulty).toBe('advanced');
    });
  });

  describe('营养建议生成', () => {
    it('应该生成合适的营养建议', async () => {
      const userProfile: UserProfile = {
        height: 170,
        weight: 70,
        fitness_level: 'beginner',
        goals: ['增重', '增肌'],
      };

      const advice = await AIService.generateNutritionAdvice(userProfile);
      expect(advice.advice).toBeDefined();
      expect(advice.advice.daily_calories).toBeGreaterThan(0);
      expect(advice.advice.macros).toBeDefined();
      expect(advice.advice.recommendations).toBeInstanceOf(Array);
    });
  });

  describe('进度分析', () => {
    it('应该正确分析训练进度', async () => {
      const workouts = [
        {
          type: '力量训练',
          duration: 45,
          calories_burned: 300,
          date: '2024-01-01',
        },
      ];

      const nutrition = [
        {
          calories: 2500,
          protein: 150,
          carbs: 300,
          fat: 80,
          date: '2024-01-01',
        },
      ];

      const goals = [
        {
          type: '体重',
          target_value: 75,
          current_value: 70,
          start_date: '2024-01-01',
          end_date: '2024-03-01',
          completed: false,
        },
      ];

      const analysis = await AIService.analyzeProgress(workouts, nutrition, goals);
      expect(analysis.analysis).toBeDefined();
      expect(analysis.analysis.workout_progress).toBeDefined();
      expect(analysis.analysis.nutrition_progress).toBeDefined();
      expect(analysis.analysis.goal_progress).toBeDefined();
    });
  });
}); 