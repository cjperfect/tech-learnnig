import { FiLoader } from 'react-icons/fi';

export default function ArticleLoading() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-24 bg-gray-200/50 rounded-lg animate-pulse" />
        </div>

        {/* Article Title Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-3/4 bg-gray-200/50 rounded-lg animate-pulse mb-4" />
          <div className="flex items-center gap-4">
            <div className="h-5 w-24 bg-gray-200/50 rounded-lg animate-pulse" />
            <div className="h-5 w-20 bg-gray-200/50 rounded-lg animate-pulse" />
            <div className="h-5 w-16 bg-gray-200/50 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Article Content Skeleton */}
        <div className="glass-card p-8">
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-200/50 rounded-lg animate-pulse" />
            <div className="h-4 w-full bg-gray-200/50 rounded-lg animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-200/50 rounded-lg animate-pulse" />
            <div className="h-4 w-full bg-gray-200/50 rounded-lg animate-pulse" />
            <div className="h-4 w-4/6 bg-gray-200/50 rounded-lg animate-pulse" />
            <div className="h-4 w-full bg-gray-200/50 rounded-lg animate-pulse" />
            <div className="h-4 w-full bg-gray-200/50 rounded-lg animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200/50 rounded-lg animate-pulse" />
            <div className="h-32 w-full bg-gray-200/50 rounded-xl animate-pulse" />
            <div className="h-4 w-full bg-gray-200/50 rounded-lg animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-200/50 rounded-lg animate-pulse" />
            <div className="h-4 w-full bg-gray-200/50 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="flex justify-center items-center py-12">
          <FiLoader className="text-3xl text-orange-500 animate-spin" />
        </div>
      </div>
    </div>
  );
}
