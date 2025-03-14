-- 创建餐食类型枚举
CREATE TYPE meal_type AS ENUM (
  'breakfast',
  'lunch',
  'dinner',
  'snack'
);

-- 创建营养记录表
CREATE TABLE IF NOT EXISTS nutrition (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  meal_type meal_type NOT NULL,
  food_name VARCHAR(255) NOT NULL,
  calories INTEGER NOT NULL,
  protein DECIMAL(10,2), -- 单位：克
  carbs DECIMAL(10,2), -- 单位：克
  fat DECIMAL(10,2), -- 单位：克
  fiber DECIMAL(10,2), -- 单位：克
  sugar DECIMAL(10,2), -- 单位：克
  serving_size DECIMAL(10,2), -- 单位：克
  meal_time TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 创建营养记录的更新触发器
CREATE TRIGGER update_nutrition_updated_at
  BEFORE UPDATE ON nutrition
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 创建索引
CREATE INDEX idx_nutrition_user_id ON nutrition(user_id);
CREATE INDEX idx_nutrition_meal_type ON nutrition(meal_type);
CREATE INDEX idx_nutrition_created_at ON nutrition(created_at); 