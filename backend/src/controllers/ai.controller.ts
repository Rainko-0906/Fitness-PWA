import { Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// 生成健身计划建议
export const generateWorkoutPlan = async (req: Request, res: Response) => {
  try {
    const { fitnessGoal, fitnessLevel, timeAvailable, preferences } = req.body;
    
    const prompt = `作为一个专业的健身教练,请根据以下信息制定一个详细的健身计划:
    - 健身目标: ${fitnessGoal}
    - 当前健身水平: ${fitnessLevel}
    - 可用时间: ${timeAvailable}分钟/天
    - 偏好: ${preferences}
    
    请包含以下内容:
    1. 每周训练计划概述
    2. 具体动作和组数
    3. 运动强度建议
    4. 注意事项和建议`;

    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.7,
    });

    res.json({
      plan: completion.data.choices[0].text,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Failed to generate workout plan',
    });
  }
};

// 生成营养建议
export const generateNutritionAdvice = async (req: Request, res: Response) => {
  try {
    const { goal, currentWeight, targetWeight, dietaryRestrictions, allergies } = req.body;
    
    const prompt = `作为一个专业的营养师,请根据以下信息提供营养建议:
    - 目标: ${goal}
    - 当前体重: ${currentWeight}kg
    - 目标体重: ${targetWeight}kg
    - 饮食限制: ${dietaryRestrictions}
    - 过敏源: ${allergies}
    
    请包含以下内容:
    1. 每日卡路里摄入建议
    2. 主要营养素分配
    3. 推荐食物清单
    4. 膳食计划示例
    5. 注意事项`;

    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.7,
    });

    res.json({
      advice: completion.data.choices[0].text,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Failed to generate nutrition advice',
    });
  }
};

// 分析运动记录并提供改进建议
export const analyzeWorkoutProgress = async (req: Request, res: Response) => {
  try {
    const { workoutHistory, goals } = req.body;
    
    const prompt = `作为一个专业的健身教练,请分析以下训练记录并提供改进建议:
    - 训练历史: ${JSON.stringify(workoutHistory)}
    - 训练目标: ${goals}
    
    请提供以下分析:
    1. 训练进展评估
    2. 存在的问题或不足
    3. 改进建议
    4. 下一阶段目标建议`;

    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.7,
    });

    res.json({
      analysis: completion.data.choices[0].text,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || 'Failed to analyze workout progress',
    });
  }
}; 