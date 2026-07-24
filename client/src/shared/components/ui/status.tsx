import type { StatusType } from "@/modules/projects/type";

type Props = {
  type: StatusType;
};


const badge: Record<StatusType, {
  label: string;
  className: string;
}> = {
  NOT_STARTED: {
    label: "Non commencé",
    className: "bg-gray-100 text-gray-700",
  },

  IN_PROGRESS: {
    label: "En cours",
    className: "bg-blue-100 text-blue-700",
  },

  COMPLETED: {
    label: "Terminé",
    className: "bg-green-100 text-green-700",
  },
};


export default function Status({ type }: Props) {

  const current = badge[type];

  return (
    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1
        rounded-full
        text-xs
        font-medium
        ${current.className}
      `}
    >
      {current.label}
    </span>
  );
}