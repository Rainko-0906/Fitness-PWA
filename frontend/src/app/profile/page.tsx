import { mockUser } from '@/mock/data';
import { User, Settings, Bell, Shield } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">个人资料</h1>
          <p className="text-muted-foreground">
            管理您的个人信息和偏好设置
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold">基本信息</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium">{mockUser.name}</h3>
                <p className="text-sm text-muted-foreground">{mockUser.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">身高</p>
                <p className="text-2xl font-bold">{mockUser.height}</p>
                <p className="text-sm text-muted-foreground">厘米</p>
              </div>
              <div>
                <p className="text-sm font-medium">体重</p>
                <p className="text-2xl font-bold">{mockUser.weight}</p>
                <p className="text-sm text-muted-foreground">公斤</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">健身水平</p>
              <p className="text-2xl font-bold capitalize">{mockUser.fitness_level}</p>
            </div>
            <div>
              <p className="text-sm font-medium">目标</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {mockUser.goals.map((goal) => (
                  <span
                    key={goal}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold">设置</h2>
            <div className="mt-4 space-y-4">
              <button className="flex w-full items-center justify-between rounded-lg border p-4 hover:bg-accent">
                <div className="flex items-center space-x-4">
                  <Settings className="h-5 w-5" />
                  <div>
                    <p className="font-medium">偏好设置</p>
                    <p className="text-sm text-muted-foreground">
                      自定义您的应用体验
                    </p>
                  </div>
                </div>
                <span className="text-muted-foreground">→</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg border p-4 hover:bg-accent">
                <div className="flex items-center space-x-4">
                  <Bell className="h-5 w-5" />
                  <div>
                    <p className="font-medium">通知设置</p>
                    <p className="text-sm text-muted-foreground">
                      管理您的通知偏好
                    </p>
                  </div>
                </div>
                <span className="text-muted-foreground">→</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg border p-4 hover:bg-accent">
                <div className="flex items-center space-x-4">
                  <Shield className="h-5 w-5" />
                  <div>
                    <p className="font-medium">隐私设置</p>
                    <p className="text-sm text-muted-foreground">
                      管理您的数据隐私
                    </p>
                  </div>
                </div>
                <span className="text-muted-foreground">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 