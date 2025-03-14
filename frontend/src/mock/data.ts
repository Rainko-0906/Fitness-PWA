export const mockUser = {
  id: '1',
  name: '测试用户',
  email: 'test@example.com',
  height: 170,
  weight: 70,
  fitness_level: 'beginner',
  goals: ['增重', '增肌']
};

export const mockWorkouts = [
  {
    id: '1',
    type: '力量训练',
    duration: 45,
    calories_burned: 300,
    date: '2024-03-13',
    notes: '胸部训练'
  },
  {
    id: '2',
    type: '有氧运动',
    duration: 30,
    calories_burned: 200,
    date: '2024-03-12',
    notes: '跑步'
  }
];

export const mockNutrition = [
  {
    id: '1',
    calories: 2500,
    protein: 150,
    carbs: 300,
    fat: 80,
    date: '2024-03-13',
    notes: '早餐'
  }
];

export const mockGoals = [
  {
    id: '1',
    type: '体重',
    target_value: 75,
    current_value: 70,
    start_date: '2024-03-01',
    end_date: '2024-06-01',
    completed: false
  }
]; 