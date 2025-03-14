import { mockWorkouts } from '@/mock/data';
import { Plus } from 'lucide-react';

export default function WorkoutsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">训练计划</h1>
          <p className="text-muted-foreground">
            查看和管理您的训练计划
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          <Plus className="mr-2 h-4 w-4" />
          添加训练
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockWorkouts.map((workout) => (
          <div
            key={workout.id}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{workout.type}</h3>
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                  {workout.date}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">时长</p>
                  <p className="text-2xl font-bold">{workout.duration}</p>
                  <p className="text-sm text-muted-foreground">分钟</p>
                </div>
                <div>
                  <p className="text-sm font-medium">消耗热量</p>
                  <p className="text-2xl font-bold">{workout.calories_burned}</p>
                  <p className="text-sm text-muted-foreground">千卡</p>
                </div>
              </div>
              {workout.notes && (
                <p className="mt-4 text-sm text-muted-foreground">
                  {workout.notes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 