"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import Loading from "@/components/layouts/loading";
import { useTheme } from "./context/themeContext";

function App({
  token,
  children,
}: PropsWithChildren<{ token: string | undefined }>) {
  const [isLoading, setIsLoading] = useState(true);
  const {
    sidebar,
    forms,
    theme,
    menu,
    layout,
    toggleTheme,
    toggleMenu,
    toggleRTL,
    rtlClass,
  } = useTheme();

  useEffect(() => {
    toggleTheme(localStorage.getItem("theme") || theme);
    toggleMenu(localStorage.getItem("menu") || menu);
    toggleRTL(localStorage.getItem("rtlClass") || rtlClass);
    setIsLoading(false);
  }, [forms]);
  return (
    <div
      className={`${(sidebar && "toggle-sidebar") || ""} ${menu} ${layout}
            main-section font-nunito relative text-sm font-normal antialiased`}
    >
      {isLoading ? <Loading /> : children}
    </div>
  );
}

export default App;
