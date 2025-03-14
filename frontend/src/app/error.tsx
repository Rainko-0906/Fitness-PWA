'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">出错了！</h2>
      <button
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        onClick={() => reset()}
      >
        重试
      </button>
    </div>
  )
} 