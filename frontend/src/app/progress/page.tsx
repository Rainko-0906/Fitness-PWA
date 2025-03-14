import { mockGoals } from '@/mock/data';
import { LineChart } from 'lucide-react';

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">进度追踪</h1>
          <p className="text-muted-foreground">
            查看您的健身和营养目标完成情况
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold">目标进度</h2>
          <div className="mt-4 space-y-4">
            {mockGoals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{goal.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {goal.current_value}/{goal.target_value}
                  </p>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${(goal.current_value / goal.target_value) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>开始: {goal.start_date}</span>
                  <span>截止: {goal.end_date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold">趋势分析</h2>
          <div className="mt-4 flex h-[200px] items-center justify-center text-muted-foreground">
            <div className="text-center">
              <LineChart className="mx-auto h-8 w-8" />
              <p className="mt-2">暂无数据</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 