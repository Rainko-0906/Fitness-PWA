# Fitness PWA

一款基于 Web 的健身 PWA 应用，支持 iOS PWA 安装，提供个性化训练和饮食推荐。

## 技术栈

### 前端
- React.js
- Next.js
- PWA
- TailwindCSS

### 后端
- Node.js
- Express.js
- Firebase Functions

### 数据存储
- Supabase (PostgreSQL)
- Firebase Firestore
- Firebase Storage / Cloudflare R2

### 认证
- Firebase Auth (Google, Apple OAuth)

### AI 服务
- Google Cloud AI / AWS Lambda
- PyTorch/TensorFlow

## 开发环境设置

1. 安装依赖
```bash
npm install
```

2. 运行开发服务器
```bash
npm run dev
```

3. 构建生产版本
```bash
npm run build
```

## 项目结构

```
fitness-pwa/
├── frontend/           # Next.js 前端应用
├── backend/            # Express + Firebase Functions
├── shared/            # 共享类型和工具
└── docs/             # 项目文档
```

## 环境变量

创建 `.env.local` 文件并设置以下环境变量：

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

## License

MIT