import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 用户相关操作
export const getUserProfile = async (firebaseUid: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('firebase_uid', firebaseUid)
    .single();

  if (error) throw error;
  return data;
};

export const updateUserProfile = async (firebaseUid: string, updates: any) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('firebase_uid', firebaseUid)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// 训练记录相关操作
export const getWorkouts = async (userId: string) => {
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
};

export const addWorkout = async (workout: any) => {
  const { data, error } = await supabase
    .from('workouts')
    .insert(workout)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// 营养记录相关操作
export const getNutritionRecords = async (userId: string) => {
  const { data, error } = await supabase
    .from('nutrition_records')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
};

export const addNutritionRecord = async (record: any) => {
  const { data, error } = await supabase
    .from('nutrition_records')
    .insert(record)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// 体重记录相关操作
export const getWeightRecords = async (userId: string) => {
  const { data, error } = await supabase
    .from('weight_records')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
};

export const addWeightRecord = async (record: any) => {
  const { data, error } = await supabase
    .from('weight_records')
    .insert(record)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// 目标相关操作
export const getGoals = async (userId: string) => {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const updateGoal = async (goalId: string, updates: any) => {
  const { data, error } = await supabase
    .from('goals')
    .update(updates)
    .eq('id', goalId)
    .select()
    .single();

  if (error) throw error;
  return data;
}; 