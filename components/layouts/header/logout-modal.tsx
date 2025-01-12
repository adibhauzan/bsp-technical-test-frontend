"use client";

import { Button } from "@/components/ui/button";
import IconLogout from "@/components/icons/icon-logout";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { API } from "@/lib/api";
import { toast } from "@/lib/utils";
import { useState } from "react";

const LogoutModal = ({ title, token }: { title: string; token: string }) => {
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

  return (
    <Button
      onClick={handleLogout}
      variant={"ghost"}
      className="h-full w-full justify-start gap-x-2 text-danger"
    >
      {isLoading ? (
        <span className="inline-block size-4.5 animate-spin rounded-full border-2 border-gray-600 border-l-transparent align-middle"></span>
      ) : (
        <IconLogout className="size-4.5 shrink-0" />
      )}
      {title}
    </Button>
  );
};

export default LogoutModal;
