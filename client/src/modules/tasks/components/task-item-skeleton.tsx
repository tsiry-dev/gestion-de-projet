export default function TaskItemSkeleton() {
    return <div className="bg-white rounded-sm mb-2 p-2 animate-pulse opacity-30">
    <div className="flex justify-between items-center">
    <div className="bg-gray-200 p-2 w-10 rounded-md"></div>
    <div className="bg-gray-200 p-2 w-7 rounded-md"></div>
    </div>
    <div className="bg-gray-200 p-2 w-full mt-4 animate-pulse"></div>
</div>
}