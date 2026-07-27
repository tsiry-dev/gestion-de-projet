import { useDroppable } from '@dnd-kit/core';
import type { ReactNode } from 'react';

type Props = {
  id: string;
  children: ReactNode;
};

export default function TaskDropColumn({ id, children }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={` rounded-md transition-all w-full ${
        isOver ? 'bg-gray-100!' : ''
      }`}
    >
      {children}
    </div>
  );
}