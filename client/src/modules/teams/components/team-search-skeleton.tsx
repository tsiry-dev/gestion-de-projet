export default function TeamSearchSkeleton() {
  return (
    <div className="mt-3 space-y-2 animate-pulse">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="
            flex
            items-center
            justify-between
            rounded-lg
            border
            border-gray-200
            bg-white
            px-3
            py-3
            w-full
          "
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200" />

            <div className="space-y-2">
              <div className="h-3 w-16 rounded bg-gray-200" />
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-3 w-40 rounded bg-gray-200" />
            </div>
          </div>

          <div className="h-7 w-14 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}