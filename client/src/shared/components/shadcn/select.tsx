import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { IoIosArrowDown } from "react-icons/io";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export default function CustomSelect({
  options,
  value,
  onChange,
  className,
}: Props) {

  const [open, setOpen] = useState(false);

  const selected = options.find(
    (option) => option.value === value
  );

  return (
    <div className="relative">
      
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          `
          flex
          items-center
          justify-between
          gap-2
          h-7
          rounded-md
          bg-gray-100
          px-2
          text-xs
          text-gray-700
          cursor-pointer
          `,
          className
        )}
      >
        {selected?.label ?? "Choisir"}

        <IoIosArrowDown size={12} />
      </button>


      {open && (
        <div
          className="
          absolute
          z-50
          mt-1
          w-full
          rounded-md
          bg-white
          shadow-md
          p-1
          "
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange?.(option.value);
                setOpen(false);
              }}
              className="
              w-full
              rounded-md
              px-2
              py-1
              text-left
              text-xs
              text-gray-700
              hover:bg-gray-100
              "
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

    </div>
  );
}