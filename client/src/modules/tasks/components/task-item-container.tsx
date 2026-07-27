import { bgStatus } from "@/modules/projects/utils";
import type { ReactNode } from "react";
import type { TaskStatusType } from "../type";
import { useDroppable, useDndContext } from "@dnd-kit/core";

type Props = {
    children: ReactNode;
    status: TaskStatusType;
}

export default function TaskItemContainer({ children, status }: Props) {

    const { setNodeRef, isOver } = useDroppable({
        id: status,
    });

    const { active } = useDndContext();

    const isDragging = Boolean(active);


    return (
        <div
            ref={setNodeRef}
            className={`
                mt-4 
                p-2 
                flex-1 
                min-h-[45rem]
                ${bgStatus(status)}
                ${isDragging && !isOver ? "opacity-30" : "opacity-100"}
                ${isDragging ? "overflow-visible" : ""}
            `}
        >
            {children}
        </div>
    );
}