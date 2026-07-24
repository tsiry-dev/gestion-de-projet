export default function SkeletonCardCount() {
  return (
    <div
    className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow animate-pulse"
    >
    <div className="h-4 w-20 bg-gray-200 rounded mb-3" />

    <div className="flex items-baseline justify-between mt-2">
        <div className="h-8 w-12 bg-gray-200 rounded" />

        <div className="h-5 w-16 bg-gray-200 rounded" />
    </div>
    </div>
  )
}
