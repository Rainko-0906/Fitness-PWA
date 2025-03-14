import { Request, Response, NextFunction } from 'express';
import { auth } from 'firebase-admin';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await auth().verifyIdToken(token);
    
    // 将用户信息添加到请求对象
    req.user = {
      id: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role,
    };
    
    next();
  } catch (error: any) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// 扩展 Request 接口以包含用户信息
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        role?: string;
      };
    }
  }
} 