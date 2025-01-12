"use client";

import { createContext, useContext, useState, useEffect } from "react";
import themeConfig from "../theme.config";
// import { getUser } from "@/lib/api/globalApi";
import { getProfileMe } from "@/lib/api/user";
// import { getClientCookieValue } from '@/lib/jwt';
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface Forms {
  form_name: string;
  xText_ID: string;
  xText_EN: string;
  xType: string;
  xActive: number;
  xURL: string;
  xIcon: string;
  permissions: string[];
  menus: any[];
}

interface User {
  id: number;
  name: string;
  email: string;
  level: string;
  roles: {
    RoleID: number;
    RoleName: string;
  }[];
  form: Forms[];
}

const initialState = {
  isDarkMode: false,
  sidebar: false,
  menu: themeConfig.menu,
  rtlClass: themeConfig.rtlClass,
  theme: themeConfig.theme,
  layout: themeConfig.layout,
  animation: themeConfig.animation,
  id: 0,
  name: "",
  email: "",
  level: "",
  image_profile: "",
  forms: [] as Forms[],
  isLoading: false,
};

type ThemeState = typeof initialState;

interface ThemeContextProps extends ThemeState {
  toggleTheme: (payload?: string) => void;
  toggleMenu: (payload?: string) => void;
  toggleSidebar: (forClose?: boolean | undefined) => void;
  toggleRTL: (payload?: string) => void;
  resetToggleSidebar: () => void;
  fetchUserData: (access_token: string) => Promise<void>;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({
  token,
  children,
}: {
  token?: string;
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<ThemeState>(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const toggleTheme = (payload: string = state.theme) => {
    localStorage.setItem("theme", payload);
    const newState = { ...state, theme: payload };
    if (payload === "light") {
      newState.isDarkMode = false;
    } else if (payload === "dark") {
      newState.isDarkMode = true;
    } else if (payload === "system") {
      newState.isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    }

    document.body.classList.toggle("dark", newState.isDarkMode);
    setState(newState);
  };

  const toggleSidebar = (forClose?: boolean) => {
    setState((prevState) => ({
      ...prevState,
      sidebar: forClose !== undefined ? forClose : !prevState.sidebar,
    }));
  };

  const toggleMenu = (payload: string = state.menu) => {
    localStorage.setItem("menu", payload);
    setState({ ...state, menu: payload });
  };

  const toggleRTL = (payload: string = state.rtlClass) => {
    localStorage.setItem("rtlClass", payload);
    setState({ ...state, rtlClass: payload });
    document.documentElement.setAttribute("dir", payload || "ltr");
  };

  const resetToggleSidebar = () => {
    setState({ ...state, sidebar: false });
  };

  const mappedForms = (forms: Forms[] | null) => {
    const mappedFormsArray: any[] = [];

    if (!forms) {
      return mappedFormsArray; // Mengembalikan array kosong jika forms null
    }

    forms.forEach((item) => {
      if (item.xType === "Division") {
        mappedFormsArray.push({
          ...item,
          menus: [],
        });
      } else if (item.xType === "Menu") {
        const division = mappedFormsArray.find((divisionItem) =>
          item.form_name.startsWith(divisionItem.form_name)
        );
        if (division) {
          division.menus.push({
            ...item,
            submenus: [],
          });
        }
      } else if (item.xType === "SubMenu") {
        const [divisionName, menuName] = item.form_name.split("-").slice(0, 2);
        const division = mappedFormsArray.find((divisionItem) =>
          divisionItem.form_name.startsWith(divisionName)
        );
        if (division) {
          const menu = division.menus.find((menuItem: any) =>
            menuItem.form_name.startsWith(`${divisionName}-${menuName}`)
          );
          if (menu) {
            menu.submenus.push({ ...item });
          }
        }
      }
    });

    return mappedFormsArray;
  };

  const fetchUserData = async (access_token: string = token || "") => {
    if (access_token) {
      setIsLoading(true);
      setState((prevState: any) => ({
        ...prevState,
        isLoading: true,
      }));
      try {
        const data = await getProfileMe(access_token);

        const { user } = data.data;

        const mapped = mappedForms(user.form);

        setState((prevState: any) => ({
          ...prevState,
          // user: user,
          id: user?.id,
          name: user.name,
          email: user.email,
          level: user.level,
          image_profile: user.image_profile,
          forms: mapped,
          isLoading: false,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
        setState((prevState: any) => ({
          ...prevState,
          isLoading: false,
        }));
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [token]);

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        toggleTheme,
        toggleSidebar,
        resetToggleSidebar,
        toggleMenu,
        toggleRTL,
        fetchUserData,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
