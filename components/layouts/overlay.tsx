"use client";

import { useTheme } from "@/context/themeContext";

const Overlay = () => {
  const { toggleSidebar, sidebar } = useTheme();
  return (
    <>
      {/* sidebar menu overlay */}
      <div
        className={`${(!sidebar && "hidden") || ""} fixed inset-0 z-40 bg-[black]/60 lg:hidden`}
        onClick={() => toggleSidebar()}
      ></div>
    </>
  );
};

export default Overlay;
