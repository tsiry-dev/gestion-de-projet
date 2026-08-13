import type { ReactNode } from "react";

type Props = {
    label?: string;
    children: ReactNode;
    error?: string | null;
}

export function FormItem({ label= '', children, error=null}: Props) {
    return <div className="mb-3 text-gray-500">
       {label && (
        <label>
           {  label }
        </label>
       )}

    { children }

    {error &&
      <span className="text-red-500">{error}</span>
    }
    </div>
}