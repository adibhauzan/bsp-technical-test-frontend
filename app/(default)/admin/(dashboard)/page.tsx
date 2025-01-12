import { ReactNode } from "react";
import DynamicSidebar from "@/components/sidebar";
import { cookies } from "next/headers";
import { getCookie, getDecodedToken } from "@/lib/jwt";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontol",
};

export default function AdminLayout() {
  // const accessToken = cookies().get("access_token")?.value as string;
  // const decoded = getDecodedToken(accessToken);

  return (
    <div className="flex">
      {/* Berikan level sebagai prop ke DynamicSidebar */}
      <p>KONTOL + MEMEK</p>
      {/* <DynamicSidebar level={[decoded.Level]} /> */}
    </div>
  );
}
