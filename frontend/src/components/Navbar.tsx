'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Dumbbell,
  Apple,
  LineChart,
  Settings,
  User,
  LogOut,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    {
      title: '主页',
      href: '/',
      icon: Home,
    },
    {
      title: '训练',
      href: '/workouts',
      icon: Dumbbell,
    },
    {
      title: '营养',
      href: '/nutrition',
      icon: Apple,
    },
    {
      title: '进度',
      href: '/progress',
      icon: LineChart,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              健身助手
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 ${
                    pathname === item.href
                      ? 'text-foreground'
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
          <Settings className="h-4 w-4" />
          <span className="sr-only">设置</span>
        </button>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64">
              <span className="hidden lg:inline-flex">搜索...</span>
              <span className="inline-flex lg:hidden">搜索...</span>
              <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>
          <nav className="flex items-center space-x-2">
            <Link
              href="/profile"
              className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-accent"
            >
              <User className="h-4 w-4" />
              <span className="sr-only">个人资料</span>
            </Link>
            <button className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-accent">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">退出登录</span>
            </button>
          </nav>
        </div>
      </div>
    </nav>
  );
} 