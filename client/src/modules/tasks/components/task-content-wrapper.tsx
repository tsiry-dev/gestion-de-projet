import { useDndContext } from "@dnd-kit/core";
import TaskContent from "./task-content";

type Props = {
  children: React.ReactNode;
}

export default function TaskContentWrapper({children}: Props) {

  const { active } = useDndContext();

  // console.log("dragging :", !!active);

  return (
    <TaskContent $isDragging={!!active}>
      {children}
    </TaskContent>
  );
}