"use client";

// import HeaderNotification from "./header-notification";
// import HeaderThemeSwitcher from "./header-theme-switcher";
// import ToggleMobile from "./toggle-mobile";
// import { PageTitle } from "../page-breadcrumb";
import { useEffect, useState } from "react";
// import LocaleSwitcher from "../locale-switcher";
import HeaderUser from "./header-user";
import IconMenu from "@/components/icons/icon-menu";
import { useTheme } from "@/context/themeContext";

const Header = () => {
  const [hasShadow, setHasShadow] = useState(false);

  const { toggleSidebar } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    // <header className={`${hasShadow ? "border-b-2 border-gray-100" : ""}`}>
    //   <div className=" bg-white px-2.5 py-2.5  dark:bg-black md:px-4">
    //     <div className="flex w-full items-center justify-between">
    //       <div className="flex w-full items-center space-x-3">
    //         {/* <div className="md:hidden">
    //           <ToggleMobile />
    //         </div> */}
    //         {/* <div className="">
    //           <PageTitle />
    //         </div> */}
    //         <div className="hidden md:block">
    //           <button
    //             type="button"
    //             className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden ltr:ml-2 rtl:mr-2"
    //             onClick={() => toggleSidebar()}
    //           >
    //             <IconMenu className="h-5 w-5" />
    //           </button>
    //         </div>
    //       </div>

    //       <div className="flex w-full items-center justify-end space-x-2 md:space-x-4">
    //       </div>
    //     </div>
    //   </div>
    // </header>
    <HeaderUser />
  );
};

export default Header;
