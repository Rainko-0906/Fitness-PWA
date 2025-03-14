-- 创建运动类型枚举
CREATE TYPE workout_type AS ENUM (
  'cardio',
  'strength',
  'flexibility',
  'sports',
  'other'
);

-- 创建运动记录表
CREATE TABLE IF NOT EXISTS workouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type workout_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  duration INTEGER NOT NULL, -- 单位：分钟
  calories_burned INTEGER,
  distance DECIMAL(10,2), -- 单位：公里
  notes TEXT,
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 创建运动记录的更新触发器
CREATE TRIGGER update_workouts_updated_at
  BEFORE UPDATE ON workouts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 创建索引
CREATE INDEX idx_workouts_user_id ON workouts(user_id);
CREATE INDEX idx_workouts_type ON workouts(type);
CREATE INDEX idx_workouts_created_at ON workouts(created_at); 