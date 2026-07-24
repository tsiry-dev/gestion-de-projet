import type { ReactNode } from "react";

export default function ProjectTaskContainer({ children }: {children: ReactNode}) {
    return (
      <div
        className="
          h-[40rem]
          flex gap-2
        "
      >
        {children}
      </div>
    );
}