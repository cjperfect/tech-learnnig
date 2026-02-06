import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="glass-card rounded-2xl p-12 max-w-2xl w-full text-center">
        <div className="text-6xl mb-6">🔍</div>
        <h2 className="text-3xl font-bold gradient-text mb-4">页面未找到</h2>
        <p className="text-gray-600 mb-8">
          抱歉,您访问的页面不存在。请检查URL是否正确,或返回首页浏览其他内容。
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="glow-button px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium"
          >
            返回首页
          </Link>
          <Link
            href="/articles"
            className="glow-button px-6 py-3 bg-white/80 text-gray-700 rounded-lg font-medium border border-orange-200"
          >
            浏览文章
          </Link>
        </div>
      </div>
    </div>
  );
}
