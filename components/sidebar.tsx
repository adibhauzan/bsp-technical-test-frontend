"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import IconDashboard from "./icons/icon-dashborad";
import IconRequests from "./icons/icon-requests";
import IconManageData from "./icons/icon-manage-data";
import IconInvoice from "./icons/icon-invoice";
import IconProfile from "./icons/icon-profile";
import IconLogout from "./icons/icon-logout";
import { API } from "@/lib/api";
import { toast } from "@/lib/utils";
import { cookies } from "next/headers";
import { deleteCookie } from "cookies-next";
import { useState } from "react";

type SidebarProps = {
  token: string;
  level: string[];
};

const menuItemsByRole: Record<
  string,
  { title: string; path: string; icon?: React.ReactNode }[]
> = {
  "1": [
    { title: "Dashboard", path: "/admin", icon: <IconDashboard /> },
    { title: "Requests", path: "/admin/list-requests", icon: <IconRequests /> },
    {
      title: "Manage Data",
      path: "/admin/manage-data",
      icon: <IconManageData />,
    },
    // { title: "Logout", path: "/logout", icon: <IconLogout /> }, // Tambahkan ini
  ],
  "2": [
    { title: "Dashboard", path: "/customer", icon: <IconDashboard /> },
    { title: "Requests", path: "/customer/requests", icon: <IconRequests /> },
    // { title: "Logout", path: "/logout", icon: <IconLogout /> }, // Tambahkan ini
  ],
};

const Sidebar = ({ level, token }: SidebarProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const res = await API.POST("auth/logout", {}, token, true);
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      deleteCookie("permissions");

      if (res.code === 200) {
        toast.fire({
          icon: "success",
          title: res.message,
          padding: "10px 20px",
        });
      } else {
        toast.fire({
          icon: "success",
          title: "Logout success! See you soon!",
          padding: "10px 20px",
        });
      }

      router.push("/sign-in");
    } catch (error) {
      toast.fire({
        icon: "error",
        title: "Something went wrong! Please try again",
        padding: "10px 20px",
      });
    }

    setIsLoading(false);
  };

  const menuItems = Array.from(
    new Set(level.flatMap((lvl) => menuItemsByRole[lvl] || []))
  );
  return (
    <div>
      <aside
        id="default-sidebar"
        className="sticky top-0 left-0 z-40 w-64 h-screen flex flex-col transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-primary/20 dark:bg-gray-800 flex flex-col">
          <h5
            id="drawer-navigation-label"
            className="text-base font-semibold text-gray-500 uppercase mb-1 ml-2 dark:text-gray-400"
          >
            Menu
          </h5>

          <ul className="space-y-2 font-medium flex-grow">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  {item.icon}
                  <span className="ms-3">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Logout and Profile Buttons */}
          <div className="mt-auto space-y-2">
            <Link
              href={"/sign-in"}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={handleLogout}
            >
              {/* <button
                onClick={handleLogout}
              > */}
              <IconLogout />
              <span className="ms-3">Logout</span>
              {/* </button> */}
            </Link>
            {/* <Link
              href={""}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <IconProfile />
              <span className="ms-3">Profile</span>
            </Link> */}
          </div>
        </div>
      </aside>
    </div>
  );
};
export default Sidebar;
