import { Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">设置</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          <Save className="h-5 w-5" />
          <span>保存更改</span>
        </button>
      </div>

      <div className="grid gap-6">
        <div className="p-6 bg-card rounded-lg">
          <h2 className="text-xl font-semibold mb-4">个人信息</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">姓名</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder="输入姓名"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">电子邮箱</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder="输入邮箱"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">生日</label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-md bg-background"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">身高 (cm)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder="输入身高"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">体重 (kg)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder="输入体重"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg">
          <h2 className="text-xl font-semibold mb-4">健身目标</h2>
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">目标类型</label>
              <select className="w-full px-3 py-2 border rounded-md bg-background">
                <option value="weight-loss">减重</option>
                <option value="muscle-gain">增肌</option>
                <option value="maintain">保持体型</option>
                <option value="endurance">提升耐力</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">目标体重 (kg)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder="输入目标体重"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">每周训练天数</label>
                <select className="w-full px-3 py-2 border rounded-md bg-background">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <option key={day} value={day}>
                      {day}天
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">活动水平</label>
              <select className="w-full px-3 py-2 border rounded-md bg-background">
                <option value="sedentary">久坐不动</option>
                <option value="lightly-active">轻度活动</option>
                <option value="moderately-active">中度活动</option>
                <option value="very-active">高度活动</option>
                <option value="extremely-active">极度活动</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg">
          <h2 className="text-xl font-semibold mb-4">营养目标</h2>
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">饮食偏好</label>
              <select className="w-full px-3 py-2 border rounded-md bg-background">
                <option value="no-preference">无特殊偏好</option>
                <option value="vegetarian">素食</option>
                <option value="vegan">纯素</option>
                <option value="keto">生酮饮食</option>
                <option value="paleo">原始人饮食</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">每日卡路里目标</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder="输入卡路里目标"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">蛋白质目标 (g)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder="输入蛋白质目标"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">碳水目标 (g)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder="输入碳水目标"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">食物过敏</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="输入食物过敏（用逗号分隔）"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 