import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { getSidebarGroupedModules } from "./sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FactoryLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const role = localStorage.getItem("role") || "";
  const sidebarGroups = getSidebarGroupedModules(role);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-12 bg-white shadow flex items-center px-4 justify-between z-40">
        <span className="font-semibold">Factory</span>

        <button onClick={() => setOpen(true)} className="p-2 border rounded">
          ☰
        </button>
      </div>

      {/* MOBILE BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen z-50
          bg-white border-r shadow-sm transition-all duration-300

          ${collapsed ? "lg:w-[92px]" : "lg:w-72"}
          ${open ? "w-72 translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="h-14 border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold">
              {collapsed ? "EP" : "Employee Panel"}
            </span>
          </div>

          {/* Desktop collapse */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setOpen(false)}
              className="lg:hidden text-sm"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Menu */}
        <div className="p-4 overflow-y-auto h-[calc(100%-56px)] space-y-6">
          {sidebarGroups.map((group) => (
            <div key={group.key}>
              {!collapsed && (
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  {group.title}
                </p>
              )}

              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.key}
                    to={item.path!}
                    className={({ isActive }) =>
                      `
                        flex items-center gap-3 p-2 rounded-lg text-sm
                        ${item.color}
                        ${
                          isActive
                            ? "ring-1 ring-blue-400 bg-blue-50/40"
                            : "hover:bg-gray-100"
                        }
                      `
                    }
                  >
                    <item.icon className="w-4 h-4" />
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`
          flex-1 bg-white min-h-screen
          transition-all duration-300
          pt-14 lg:pt-0`}
      >
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default FactoryLayout;
