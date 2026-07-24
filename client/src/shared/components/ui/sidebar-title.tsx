import type { ReactNode } from "react"

type Props = {
    children: ReactNode;
}
export default function SidebarTitle({ children }: Props) {


    return <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
       { children }
    </h2>
 
}