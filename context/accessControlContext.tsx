"use client";

import { usePathname, useRouter, useParams } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTheme } from "./themeContext";
import { formatMenu } from "@/lib/utils";

type Permission =
  | "Approve 1"
  | "Approve 2"
  | "Create"
  | "Delete"
  | "Generate"
  | "Print"
  | "Read"
  | "Reject"
  | "Update";
type AccessControlProviderProps = {
  children: React.ReactNode;
};

type AccessControlContextProps = {
  hasPermission: (string: Permission) => boolean;
};

const AccessControlContext = createContext<
  AccessControlContextProps | undefined
>(undefined);

export const AccessControlProvider = ({
  children,
}: AccessControlProviderProps) => {
  const router = useRouter();
  const params = useParams();
  const [currentMenu, setCurrentMenu] = useState<any>(null);
  const [canAccess, setCanAccess] = useState(true);
  const { forms, isLoading } = useTheme();
  const pathname = usePathname();

  const checkPermission = (
    permissions: string[],
    requiredPermissions: string[]
  ) => {
    return requiredPermissions.some((permission) =>
      permissions?.includes(permission)
    );
  };

  const removeSpecificSegments = (url: string): string => {
    const segments = url.split("/").filter(Boolean);
    segments.shift();
    const removeIndex = segments.findIndex(
      (segment) =>
        segment === "add" || segment === "edit" || /^\d+$/.test(segment)
    );

    if (removeIndex !== -1) {
      segments.splice(removeIndex);
    }

    return "/" + segments.join("/");
  };

  const removeFirstSegments = (url: string): string => {
    const segments = url.split("/").filter(Boolean);
    segments.shift();

    return "/" + segments.join("/");
  };

  useEffect(() => {
    const newPathname = removeSpecificSegments(pathname);

    // jika ingin mengakses page yang bukan dari API perlu ditambahkan path nya disini
    const checkPath =
      newPathname !== "/" &&
      newPathname !== "/profil" &&
      newPathname !== "/pesan";

    // jika path yang di akses (hardcode) set true
    if (!checkPath) return setCanAccess(true);

    // jika tidak ada permission set false
    if (forms?.length <= 0) return setCanAccess(false);

    const canAccessMenu: any = formatMenu(forms, newPathname);

    // jika tidak ada permission Read ketika akses menu list maka set false
    if (
      removeFirstSegments(pathname) === canAccessMenu?.xURL &&
      !checkPermission(canAccessMenu?.permissions, ["Read"])
    ) {
      setCanAccess(false);
      return;
    }

    // jika tidak ada permission Create ketika akses menu add maka set false
    if (
      pathname.includes("/add") &&
      !checkPermission(canAccessMenu?.permissions, ["Create"])
    ) {
      setCanAccess(false);
      return;
    }

    // jika tidak ada permission Update, atau Read ketika akses menu edit maka set false
    if (
      (pathname.includes("/edit") || !!params?.id) &&
      !checkPermission(canAccessMenu?.permissions, ["Update", "Read"])
    ) {
      setCanAccess(false);
      return;
    }

    setCurrentMenu(canAccessMenu);
    setCanAccess(!!canAccessMenu);
  }, [pathname, forms]);

  const hasPermission = useMemo(
    () => (permission: Permission) => {
      const canAccess = currentMenu?.permissions?.includes(permission);

      return canAccess;
    },
    [pathname, forms, currentMenu]
  );

  return (
    <AccessControlContext.Provider value={{ hasPermission }}>
      {/* {isLoading && !canAccess ? <Loading /> : canAccess ? children : <UnauthorizedError />} */}

      {/* {canAccess ? children : <NotFound />} */}
      {children}
    </AccessControlContext.Provider>
  );
};

export const useAccess = () => {
  const context = useContext(AccessControlContext);
  if (!context) {
    throw new Error("useAccess must be used within a AccessControlProvider");
  }

  return context;
};
