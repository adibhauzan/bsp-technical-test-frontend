import { ReactNode } from "react";
import DynamicSidebar from "@/components/sidebar";
import { cookies } from "next/headers";
import { getCookie, getDecodedToken } from "@/lib/jwt";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage - Data",
};

export default function AdminLayout() {
  //   const accessToken = cookies().get("access_token")?.value as string;
  //   const decoded = getDecodedToken(accessToken);

  return (
    <div className="flex">
      <h1> Kontooooooool </h1>
    </div>
  );
}
