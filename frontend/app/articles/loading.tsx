import { FiLoader } from 'react-icons/fi';

export default function ArticlesLoading() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-10 w-48 mx-auto bg-gray-200/50 rounded-lg animate-pulse mb-4" />
          <div className="h-6 w-96 mx-auto bg-gray-200/50 rounded-lg animate-pulse" />
        </div>

        {/* Search and Filter Skeleton */}
        <div className="glass-card mb-8 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 h-10 bg-gray-200/50 rounded-lg animate-pulse" />
            <div className="flex gap-2">
              <div className="h-10 w-16 bg-gray-200/50 rounded-lg animate-pulse" />
              <div className="h-10 w-16 bg-gray-200/50 rounded-lg animate-pulse" />
              <div className="h-10 w-16 bg-gray-200/50 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>

        {/* Articles Skeleton */}
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-48 h-32 bg-gray-200/50 rounded-lg animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-7 w-3/4 bg-gray-200/50 rounded-lg animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200/50 rounded-lg animate-pulse" />
                    <div className="h-4 w-2/3 bg-gray-200/50 rounded-lg animate-pulse" />
                  </div>
                  <div className="flex gap-4">
                    <div className="h-4 w-24 bg-gray-200/50 rounded-lg animate-pulse" />
                    <div className="h-4 w-24 bg-gray-200/50 rounded-lg animate-pulse" />
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
    </div>
  );
}
