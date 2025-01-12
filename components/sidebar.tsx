import Link from "next/link";
import IconDashboard from "./icons/icon-dashborad";
import IconRequests from "./icons/icon-requests";
import IconManageData from "./icons/icon-manage-data";

type SidebarProps = {
  level: string[];
};

const menuItemsByRole: Record<
  string,
  { title: string; path: string; icon?: React.ReactNode }[]
> = {
  "1": [
    { title: "Dashboard", path: "/admin", icon: <IconDashboard /> },
    { title: "Requests", path: "/admin/requests", icon: <IconRequests /> },
    {
      title: "Manage Data",
      path: "/admin/manage-data",
      icon: <IconManageData />,
    },
  ],
  //   "2": [
  //     { title: "Dashboard", path: "/customer", icon: <IconDashboard /> },
  //     { title: "Orders", path: "/customer/orders", icon: <IconDashboard /> },
  //     { title: "Profile", path: "/customer/profile", icon: <IconDashboard /> },
  //   ],
};

const Sidebar = ({ level }: SidebarProps) => {
  const menuItems = Array.from(
    new Set(level.flatMap((lvl) => menuItemsByRole[lvl] || []))
  );

  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-primary/20 dark:bg-gray-800">
          <h5
            id="drawer-navigation-label"
            className="text-base font-semibold text-gray-500 uppercase mb-1 ml-2 dark:text-gray-400"
          >
            Menu
          </h5>
          {/* <button
            type="button"
            data-drawer-hide="drawer-navigation"
            aria-controls="drawer-navigation"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button> */}
          <ul className="space-y-2 font-medium">
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
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
