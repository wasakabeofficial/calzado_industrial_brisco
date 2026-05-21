import { useState } from "react";
import { Link, useLocation } from "react-router";
import { MdDashboard, MdPeople, MdCampaign } from "react-icons/md";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", icon: <MdDashboard size={22} />, path: "/" },
  { label: "Clientes", icon: <MdPeople size={22} />, path: "/clientes" },
  { label: "Campañas", icon: <MdCampaign size={22} />, path: "/campanas" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="flex items-center justify-between px-3 py-4 border-b border-gray-200">
        {!collapsed && (
          <span className="text-sm font-bold text-gray-800 tracking-wide">
            Menú
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
          aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        >
          {collapsed ? (
            <IoChevronForward size={18} />
          ) : (
            <IoChevronBack size={18} />
          )}
        </button>
      </div>

      <nav className="flex-1 py-2">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
