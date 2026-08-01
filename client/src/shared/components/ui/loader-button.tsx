type Props = {
    title: string
}

export default function LoaderButton({ title }: Props) {
    return <div className="flex items-center gap-2">
       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin block" ></div>
        <div className="text-[1rem]">{title}</div>
    </div>
}