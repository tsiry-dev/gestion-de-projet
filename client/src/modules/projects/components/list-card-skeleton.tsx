import Card from "@/shared/components/ui/card";

export default function ListCardSkeleton() {
  return (
    <Card>
      <div className="flex items-center justify-between animate-pulse">

        {/* Left */}
        <div className="flex-1">
          <div className="h-5 w-52 rounded-md bg-gray-200" />

          <div className="mt-3 space-y-2">
            <div className="h-3 w-80 rounded bg-gray-200" />
            <div className="h-3 w-56 rounded bg-gray-200" />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">

          {/* Status */}
          <div className="h-7 w-24 rounded-full bg-gray-200" />

          {/* Task count */}
          <div className="h-4 w-20 rounded bg-gray-200" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gray-200" />
            <div className="h-9 w-9 rounded-lg bg-gray-200" />
            <div className="h-9 w-9 rounded-lg bg-gray-200" />
          </div>

        </div>

      </div>
    </Card>
  );
}