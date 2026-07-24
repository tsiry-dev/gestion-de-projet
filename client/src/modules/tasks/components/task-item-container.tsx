import { bgStatus } from "@/modules/projects/utils";
import type { ReactNode } from "react"
import type { TaskStatusType } from "../type";

type Props = {
    children: ReactNode;
    status: TaskStatusType
}

export default function TaskItemContainer({ children , status}: Props) {
   return  <div className={`mt-4 p-2 flex-1 min-h-[45rem]  ${bgStatus(status)}`}>
      { children }
   </div>
}