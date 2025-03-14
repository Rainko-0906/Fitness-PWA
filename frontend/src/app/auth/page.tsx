'use client';

import { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signInWithGoogle, signInWithGithub, signInWithEmail, signUpWithEmail } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        if (password !== confirmPassword) {
          throw new Error('两次输入的密码不一致');
        }
        await signUpWithEmail(email, password);
      }
      router.push('/');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push('/');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub();
      router.push('/');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">
            {isLogin ? '欢迎回来' : '创建账号'}
          </h1>
          <p className="text-muted-foreground">
            {isLogin
              ? '登录您的账号以继续'
              : '注册一个新账号以开始您的健身之旅'}
          </p>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="name">
                姓名
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="输入您的姓名"
                  className="w-full pl-10 pr-3 py-2 border rounded-md bg-background"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="email">
              电子邮箱
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="输入您的邮箱"
                className="w-full pl-10 pr-3 py-2 border rounded-md bg-background"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="password">
              密码
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="输入您的密码"
                className="w-full pl-10 pr-3 py-2 border rounded-md bg-background"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="confirmPassword">
                确认密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="再次输入密码"
                  className="w-full pl-10 pr-3 py-2 border rounded-md bg-background"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            <span>{isLogin ? '登录' : '注册'}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-primary hover:underline"
          >
            {isLogin ? '没有账号？点击注册' : '已有账号？点击登录'}
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              或通过以下方式{isLogin ? '登录' : '注册'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex items-center justify-center space-x-2 p-2 border rounded-md hover:bg-accent disabled:opacity-50"
          >
            <img
              src="/google.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span>Google</span>
          </button>
          <button
            onClick={handleGithubSignIn}
            disabled={loading}
            className="flex items-center justify-center space-x-2 p-2 border rounded-md hover:bg-accent disabled:opacity-50"
          >
            <img
              src="/github.svg"
              alt="GitHub"
              className="h-5 w-5"
            />
            <span>GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
} 