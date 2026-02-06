'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="glass-card rounded-2xl p-12 max-w-2xl w-full text-center">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-3xl font-bold gradient-text mb-4">出错了</h2>
        <p className="text-gray-600 mb-8">
          抱歉,页面加载时遇到了问题。请尝试刷新页面或返回首页。
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="glow-button px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium"
          >
            重试
          </button>
          <Link
            href="/"
            className="glow-button px-6 py-3 bg-white/80 text-gray-700 rounded-lg font-medium border border-orange-200"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
