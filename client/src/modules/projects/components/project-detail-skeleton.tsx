// Composant Skeleton
export default function ProjectDetailSkeleton() {
  return (
    <div className="h-[80vh] overflow-hidden animate-pulse">
      {/* DialogHead Skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>

      <div className="flex mt-3 min-h-[60vh]">
        {/* Sidebar Skeleton */}
        <aside className="w-[30%] space-y-3">
          <div className="h-7 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </aside>

        {/* Main content Skeleton */}
        <main className="border-l-1 border-gray-300 flex-1">
          <div className="ml-3 space-y-3">
            {/* SubTitle Skeleton */}
            <div className="flex justify-between mb-3">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/22"></div>
            </div>

            {/* Grid Cards Skeleton */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(12)].map((_, index) => (
                <div key={index} className=" bg-gray-200 rounded p-3">
                   <div className="p-3 w-[30%] mb-2 bg-gray-300 rounded-lg"></div>
                   <div className="p-2 w-[80%] bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}