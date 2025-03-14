import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import { errorHandler } from './middleware/errorHandler';
import { initializeApp, cert } from 'firebase-admin/app';
import { verifyToken } from './middleware/auth.middleware';

// 加载环境变量
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// 中间件配置
app.use(helmet()); // 安全头
app.use(cors()); // 跨域
app.use(compression()); // 压缩
app.use(morgan('dev')); // 日志
app.use(express.json()); // JSON 解析
app.use(express.urlencoded({ extended: true })); // URL 编码

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100 // 限制每个IP 100次请求
});
app.use(limiter);

// 初始化Firebase Admin
initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

// API 路由
import userRoutes from './routes/user.routes';
import workoutRoutes from './routes/workout.routes';
import nutritionRoutes from './routes/nutrition.routes';
import aiRoutes from './routes/ai.routes';

// 公开路由
app.use('/api/users', userRoutes);

// 受保护路由
app.use('/api/workouts', verifyToken, workoutRoutes);
app.use('/api/nutrition', verifyToken, nutritionRoutes);
app.use('/api/ai', verifyToken, aiRoutes);

// 基础路由
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 错误处理
app.use(errorHandler);

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
}); 