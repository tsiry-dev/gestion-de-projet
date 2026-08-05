import type { ReactNode } from "react";
import type { Project } from "../type";

type Props = {
  children: ReactNode;
  project: Project
}

export default function ProjectTaskContainer({ children, project }: Props) {
  // console.log(project)
    return (
      <div
        className={`
          ${project?.status === "COMPLETED" ? "pointer-events-none opacity-30" : ""}
          h-[45rem]
          flex gap-2
        `}
      >
        {children}
      </div>
    );
}