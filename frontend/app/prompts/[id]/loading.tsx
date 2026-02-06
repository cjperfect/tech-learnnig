import { FiLoader } from 'react-icons/fi';

export default function PromptLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-24 bg-gray-200/50 rounded-lg animate-pulse" />
        </div>

        {/* Prompt Header Skeleton */}
        <div className="glass-card p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="h-10 w-3/4 bg-gray-200/50 rounded-lg animate-pulse mb-4" />
              <div className="h-5 w-48 bg-gray-200/50 rounded-lg animate-pulse" />
            </div>
            <div className="w-16 h-16 bg-gray-200/50 rounded-xl animate-pulse" />
          </div>

          <div className="flex items-center gap-4">
            <div className="h-8 w-24 bg-gray-200/50 rounded-lg animate-pulse" />
            <div className="h-8 w-24 bg-gray-200/50 rounded-lg animate-pulse" />
            <div className="h-8 w-24 bg-gray-200/50 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Prompt Content Skeleton */}
        <div className="glass-card p-8">
          <div className="mb-6">
            <div className="h-6 w-32 bg-gray-200/50 rounded-lg animate-pulse mb-4" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200/50 rounded-lg animate-pulse" />
              <div className="h-4 w-full bg-gray-200/50 rounded-lg animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200/50 rounded-lg animate-pulse" />
            </div>
          </div>

          <div className="mb-6">
            <div className="h-6 w-24 bg-gray-200/50 rounded-lg animate-pulse mb-4" />
            <div className="bg-gray-200/30 rounded-lg p-4 space-y-2">
              <div className="h-4 w-full bg-gray-200/50 rounded-lg animate-pulse" />
              <div className="h-4 w-full bg-gray-200/50 rounded-lg animate-pulse" />
              <div className="h-4 w-full bg-gray-200/50 rounded-lg animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200/50 rounded-lg animate-pulse" />
              <div className="h-4 w-4/6 bg-gray-200/50 rounded-lg animate-pulse" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-12 w-32 bg-gray-200/50 rounded-lg animate-pulse" />
            <div className="h-12 w-32 bg-gray-200/50 rounded-lg animate-pulse" />
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
