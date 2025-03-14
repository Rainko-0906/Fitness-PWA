import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// 中间件
app.use(helmet()); // 安全头
app.use(cors()); // 跨域支持
app.use(compression()); // 响应压缩
app.use(morgan('dev')); // 请求日志
app.use(express.json()); // JSON 解析
app.use(express.urlencoded({ extended: true })); // URL 编码解析

// 路由
app.use('/api', routes);

// 错误处理
app.use(errorHandler);

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: '未找到请求的资源',
  });
});

export default app; 