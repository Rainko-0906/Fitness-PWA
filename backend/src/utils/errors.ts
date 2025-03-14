export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = '认证失败') {
    super(401, message);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = '没有权限') {
    super(403, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = '资源未找到') {
    super(404, message);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = '资源冲突') {
    super(409, message);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = '数据库操作失败') {
    super(500, message);
  }
}

export class ExternalServiceError extends AppError {
  constructor(message: string = '外部服务调用失败') {
    super(502, message);
  }
} 