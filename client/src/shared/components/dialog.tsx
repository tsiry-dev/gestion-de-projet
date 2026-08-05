import { useEffect, type ReactNode } from "react";
import Paragraphe from "./ui/paragraphe";
import { MdOutlineClose } from "react-icons/md";


type DialogTitleProps = {
    title: string;
    description?: string;
}

export function DialogHead({title, description}: DialogTitleProps) {
    return <header className="">
         <h2 className="text-xl text-gray-600">{title}</h2>
         {description && (
            <Paragraphe>
            {description}
            </Paragraphe>
         )}
    </header>
}

type DialogProps = {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | "full";
  open: boolean;
  onClose: () => void;
};

const sizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-5xl",
  xxl: "max-w-7xl",
  xxxl: "max-w-[95rem]",
  full: "max-w-full mx-5",
};

export function Dialog({
  children,
  size = "lg",
  open = false,
  onClose,
}: DialogProps) {

  useEffect(() => {
    const content = document.getElementById("content");

    if (!content) return;

    if (open) {
      content.style.overflow = "hidden";
      content.style.height = "100vh"
    }

    return () => {
      content.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute left-0 w-full h-full  bg-[#0000007a]"
        onClick={onClose}
      />

    
      {/* Content */}
      <div
        className={`
          relative z-10 w-full rounded-xl bg-white p-6 shadow-sm
          ${sizes[size]}
        `}
      >
      <button
        type="button"
        onClick={onClose}
        className="
          absolute right-3 top-3
          flex h-6 w-6 items-center justify-center
          rounded-full
          text-gray-500
          transition
          hover:bg-red-400
          hover:text-gray-50
          active:scale-95
        "
        aria-label="Fermer"
      >
        <MdOutlineClose size={15} />
      </button>
        {children}
      </div>

    </div>
  );
}
