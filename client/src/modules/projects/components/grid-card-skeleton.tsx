export default function ProjectCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-pulse">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="h-5 w-36 bg-gray-200 rounded-md" />

        <div className="h-6 w-24 bg-gray-200 rounded-full" />
      </div>

      {/* Description */}
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-4/5 bg-gray-200 rounded" />
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center">

        {/* Task count */}
        <div className="space-y-2">
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-8 w-12 bg-gray-200 rounded-md" />
        </div>

        {/* Actions icons */}
        <div className="flex gap-2">
          <div className="h-9 w-9 bg-gray-200 rounded-lg" />
          <div className="h-9 w-9 bg-gray-200 rounded-lg" />
          <div className="h-9 w-9 bg-gray-200 rounded-lg" />
        </div>

      </div>

    </div>
  );
}