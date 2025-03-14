# 健身助手 API 文档

## 基础信息

- 基础URL: `/api`
- 所有需要认证的接口都需要在请求头中携带 `Authorization: Bearer <token>`
- 所有响应都使用 JSON 格式
- 时间格式使用 ISO 8601 标准

## 认证

### 登录

```http
POST /auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

响应：
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string"
  }
}
```

### 注册

```http
POST /auth/register
Content-Type: application/json

{
  "email": "string",
  "password": "string",
  "name": "string"
}
```

响应：
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string"
  }
}
```

## 用户信息

### 获取用户信息

```http
GET /users/me
Authorization: Bearer <token>
```

响应：
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "avatar_url": "string",
  "height": number,
  "weight": number,
  "fitness_level": "beginner" | "intermediate" | "advanced",
  "goals": ["string"]
}
```

### 更新用户信息

```http
PUT /users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "string",
  "avatar_url": "string",
  "height": number,
  "weight": number,
  "fitness_level": "beginner" | "intermediate" | "advanced",
  "goals": ["string"]
}
```

响应：同获取用户信息

## 训练记录

### 获取训练记录列表

```http
GET /workouts
Authorization: Bearer <token>
```

响应：
```json
[
  {
    "id": "string",
    "type": "string",
    "title": "string",
    "duration": number,
    "calories_burned": number,
    "date": "string",
    "completed": boolean,
    "notes": "string"
  }
]
```

### 创建训练记录

```http
POST /workouts
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "string",
  "title": "string",
  "duration": number,
  "calories_burned": number,
  "date": "string",
  "completed": boolean,
  "notes": "string"
}
```

响应：同获取训练记录列表中的单个记录

### 更新训练记录

```http
PUT /workouts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "string",
  "title": "string",
  "duration": number,
  "calories_burned": number,
  "date": "string",
  "completed": boolean,
  "notes": "string"
}
```

响应：同获取训练记录列表中的单个记录

### 删除训练记录

```http
DELETE /workouts/:id
Authorization: Bearer <token>
```

响应：204 No Content

## 营养记录

### 获取营养记录列表

```http
GET /nutrition
Authorization: Bearer <token>
```

响应：
```json
[
  {
    "id": "string",
    "type": "string",
    "name": "string",
    "calories": number,
    "protein": number,
    "carbs": number,
    "fat": number,
    "date": "string",
    "notes": "string"
  }
]
```

### 创建营养记录

```http
POST /nutrition
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "string",
  "name": "string",
  "calories": number,
  "protein": number,
  "carbs": number,
  "fat": number,
  "date": "string",
  "notes": "string"
}
```

响应：同获取营养记录列表中的单个记录

### 更新营养记录

```http
PUT /nutrition/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "string",
  "name": "string",
  "calories": number,
  "protein": number,
  "carbs": number,
  "fat": number,
  "date": "string",
  "notes": "string"
}
```

响应：同获取营养记录列表中的单个记录

### 删除营养记录

```http
DELETE /nutrition/:id
Authorization: Bearer <token>
```

响应：204 No Content

## 目标

### 获取目标列表

```http
GET /goals
Authorization: Bearer <token>
```

响应：
```json
[
  {
    "id": "string",
    "type": "string",
    "target_value": number,
    "current_value": number,
    "start_date": "string",
    "end_date": "string",
    "completed": boolean,
    "notes": "string"
  }
]
```

### 创建目标

```http
POST /goals
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "string",
  "target_value": number,
  "current_value": number,
  "start_date": "string",
  "end_date": "string",
  "notes": "string"
}
```

响应：同获取目标列表中的单个记录

### 更新目标

```http
PUT /goals/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "string",
  "target_value": number,
  "current_value": number,
  "start_date": "string",
  "end_date": "string",
  "completed": boolean,
  "notes": "string"
}
```

响应：同获取目标列表中的单个记录

### 删除目标

```http
DELETE /goals/:id
Authorization: Bearer <token>
```

响应：204 No Content

## AI 服务

### 获取个性化训练计划

```http
GET /ai/workout-plan
Authorization: Bearer <token>
```

响应：
```json
{
  "plan": {
    "exercises": [
      {
        "name": "string",
        "sets": number,
        "reps": number,
        "rest": number,
        "notes": "string"
      }
    ],
    "duration": number,
    "difficulty": "beginner" | "intermediate" | "advanced"
  }
}
```

### 获取营养建议

```http
GET /ai/nutrition-advice
Authorization: Bearer <token>
```

响应：
```json
{
  "advice": {
    "daily_calories": number,
    "macros": {
      "protein": number,
      "carbs": number,
      "fat": number
    },
    "recommendations": ["string"]
  }
}
```

### 获取进度分析

```http
GET /ai/progress-analysis
Authorization: Bearer <token>
```

响应：
```json
{
  "analysis": {
    "workout_progress": {
      "total_workouts": number,
      "total_duration": number,
      "total_calories": number,
      "improvements": ["string"]
    },
    "nutrition_progress": {
      "average_calories": number,
      "macro_balance": {
        "protein": number,
        "carbs": number,
        "fat": number
      },
      "recommendations": ["string"]
    },
    "goal_progress": {
      "completed_goals": number,
      "in_progress_goals": number,
      "suggestions": ["string"]
    }
  }
}
```

## 错误响应

所有接口在发生错误时都会返回以下格式：

```json
{
  "status": "error" | "fail",
  "message": "string",
  "errors": [
    {
      "field": "string",
      "message": "string"
    }
  ]
}
```

常见状态码：
- 200: 成功
- 201: 创建成功
- 204: 删除成功
- 400: 请求参数错误
- 401: 未认证
- 403: 无权限
- 404: 资源不存在
- 409: 资源冲突
- 429: 请求过于频繁
- 500: 服务器内部错误
- 502: 外部服务错误 