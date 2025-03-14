import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">页面未找到</h2>
      <Link
        href="/"
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
      >
        返回首页
      </Link>
    </div>
  )
} 