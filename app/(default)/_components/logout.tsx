"use client";

import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { API } from "@/lib/api";
import { toast } from "@/components/ui/sweet-alert";
import { getCookie } from "@/lib/jwt";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const accessToken = getCookie("access_token") as string;

    try {
      // Panggil endpoint logout jika diperlukan
      await API.POST("auth/logout", {}, accessToken, true);
      deleteCookie("access_token");
      toast.fire({
        icon: "success",
        title: "You have been logged out",
        padding: "10px 20px",
      });
    } catch (error: any) {
      toast.fire({
        icon: "error",
        title: `Failed to logout: ${error.message}`,
        padding: "10px 20px",
      });
    }

    // Redirect ke halaman login
    router.push("/sign-in");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-gradient-to-r hover:from-red-400 hover:to-red-300 text-white-light py-2 rounded-md"
    >
      Logout
    </button>
  );
};

export default Logout;
