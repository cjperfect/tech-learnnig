import { FiLoader } from 'react-icons/fi';

export default function AIHotspotLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Skeleton */}
      <div className="mb-12">
        <div className="h-10 w-40 bg-gray-200/50 rounded-lg animate-pulse mb-2" />
        <div className="h-6 w-80 bg-gray-200/50 rounded-lg animate-pulse" />
      </div>

      {/* Category Filter Skeleton */}
      <div className="mb-8 flex gap-2">
        <div className="h-10 w-16 bg-gray-200/50 rounded-lg animate-pulse" />
        <div className="h-10 w-16 bg-gray-200/50 rounded-lg animate-pulse" />
        <div className="h-10 w-16 bg-gray-200/50 rounded-lg animate-pulse" />
        <div className="h-10 w-16 bg-gray-200/50 rounded-lg animate-pulse" />
        <div className="h-10 w-16 bg-gray-200/50 rounded-lg animate-pulse" />
      </div>

      {/* Hotspots List Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="glass-card p-6">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-16 bg-gray-200/50 rounded-full animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200/50 rounded-lg animate-pulse" />
                  <div className="h-4 w-20 bg-gray-200/50 rounded-lg animate-pulse" />
                </div>
                <div className="h-6 w-3/4 bg-gray-200/50 rounded-lg animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200/50 rounded-lg animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200/50 rounded-lg animate-pulse" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 bg-gray-200/50 rounded-lg animate-pulse" />
                  <div className="h-8 w-20 bg-gray-200/50 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      <div className="flex justify-center items-center py-12">
        <FiLoader className="text-3xl text-orange-500 animate-spin" />
      </div>
    </div>
  );
}
