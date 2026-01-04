import { BarChart3, Users } from "lucide-react";

export type ChildMenu = {
  key: string;
  label: string;
  path: string;
};

export type MenuItem = {
  key: string;
  label: string;
  icon: any;
  color: string;
  path?: string;
  children?: ChildMenu[];
};

export type MenuGroup = {
  key: string;
  title: string;
  items: MenuItem[];
};

export const getSidebarGroupedModules = (userRole: string): MenuGroup[] => {
  if (userRole === "Factory Manager") {
    return [
      {
        key: "dashboard",
        title: "Dashboard",
        items: [
          {
            key: "dashboard",
            label: "Dashboard",
            icon: BarChart3,
            color: "bg-[#ecf7f0] text-[#16a34a]",
            path: "dashboard",
          },
        ],
      },

      {
        key: "employees",
        title: "Employees",
        items: [
          {
            key: "employee-list",
            label: "Employee List",
            icon: Users,
            color: "bg-[#f6eefd] text-[#9333ea]",
            path: "employee-List",
          },
        ],
      },
    ];
  }

  // fallback
  return [];
};
