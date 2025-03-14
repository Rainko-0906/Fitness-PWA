import Link from 'next/link';
import { Dumbbell, Apple, LineChart, Trophy, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      title: '训练计划',
      description: '制定个性化的训练计划，追踪您的健身进度',
      href: '/workouts',
      icon: Dumbbell,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      title: '营养管理',
      description: '记录饮食摄入，获取营养建议',
      href: '/nutrition',
      icon: Apple,
      color: 'bg-green-500/10 text-green-500',
    },
    {
      title: '进度追踪',
      description: '查看您的健身和营养目标完成情况',
      href: '/progress',
      icon: LineChart,
      color: 'bg-purple-500/10 text-purple-500',
    },
    {
      title: '成就系统',
      description: '完成目标获得成就，保持运动动力',
      href: '/profile',
      icon: Trophy,
      color: 'bg-orange-500/10 text-orange-500',
    },
  ];

  const todayOverview = {
    workoutCompleted: true,
    caloriesBurned: 320,
    workoutDuration: 45,
    caloriesConsumed: 1850,
    targetCalories: 2000,
    waterIntake: 2000,
    targetWater: 2500,
    stepsCount: 8500,
    targetSteps: 10000,
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">欢迎回来，张三</h1>
        <p className="text-muted-foreground">
          今天是继续保持健康生活的好日子。查看您的每日概览并继续前进！
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.href}
              href={feature.href}
              className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:border-primary"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border">
                <Icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 text-primary opacity-0 transition-all group-hover:opacity-100" />
            </Link>
          );
        })}
      </div>

      <div className="rounded-lg border bg-card">
        <div className="flex items-center border-b p-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold">今日概览</h2>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })}
            </p>
          </div>
          {todayOverview.workoutCompleted ? (
            <div className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-500">
              已完成训练
            </div>
          ) : (
            <div className="rounded-full bg-orange-500/10 px-3 py-1 text-sm text-orange-500">
              未完成训练
            </div>
          )}
        </div>
        <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm font-medium">消耗热量</p>
            <div className="mt-2 flex items-end gap-2">
              <p className="text-2xl font-bold">{todayOverview.caloriesBurned}</p>
              <p className="text-sm text-muted-foreground mb-1">千卡</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">训练时长</p>
            <div className="mt-2 flex items-end gap-2">
              <p className="text-2xl font-bold">{todayOverview.workoutDuration}</p>
              <p className="text-sm text-muted-foreground mb-1">分钟</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">摄入热量</p>
            <div className="mt-2 flex items-end gap-2">
              <p className="text-2xl font-bold">
                {todayOverview.caloriesConsumed}/{todayOverview.targetCalories}
              </p>
              <p className="text-sm text-muted-foreground mb-1">千卡</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">饮水量</p>
            <div className="mt-2 flex items-end gap-2">
              <p className="text-2xl font-bold">
                {todayOverview.waterIntake}/{todayOverview.targetWater}
              </p>
              <p className="text-sm text-muted-foreground mb-1">ml</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
