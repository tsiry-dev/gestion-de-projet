import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  children: ReactNode;
  to: string;
};

export default function SidebarLink({ children, to }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`
      }
    >
      {children}
    </NavLink>
  );
}