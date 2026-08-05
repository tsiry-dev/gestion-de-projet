type Props = {
    title: string,
    variant?: "light" | "dark"
}

export default function LoaderBadge({ title, variant = "light" }: Props) {
    return <div className="flex items-center gap-2">
       <div className={`w-4 h-4 border-1 ${variant === "light" ? "border-gray-300" : "border-gray-700"} rounded-full animate-spin`} />
        <div className="text-[.7rem]">{title}</div>
    </div>
}