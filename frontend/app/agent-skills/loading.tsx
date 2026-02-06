import { FiLoader } from 'react-icons/fi';

export default function AgentSkillsLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Skeleton */}
      <div className="mb-12">
        <div className="h-10 w-48 bg-gray-200/50 rounded-lg animate-pulse mb-2" />
        <div className="h-6 w-72 bg-gray-200/50 rounded-lg animate-pulse" />
      </div>

      {/* Skills Grid Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gray-200/50 rounded-xl animate-pulse" />
              <div className="h-4 w-16 bg-gray-200/50 rounded-lg animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="h-6 w-3/4 bg-gray-200/50 rounded-lg animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200/50 rounded-lg animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200/50 rounded-lg animate-pulse" />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="h-6 w-16 bg-gray-200/50 rounded-full animate-pulse" />
                <div className="h-8 w-20 bg-gray-200/50 rounded-lg animate-pulse" />
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
