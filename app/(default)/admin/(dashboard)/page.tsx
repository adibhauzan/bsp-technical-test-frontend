import { ReactNode } from "react";
import DynamicSidebar from "@/components/sidebar";
import { cookies } from "next/headers";
import { getCookie, getDecodedToken } from "@/lib/jwt";
import { Metadata } from "next";
import SectionError from "@/components/errors/error-page";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function AdminLayout() {
  const access_token = cookies().get("access_token")?.value;
  if (!access_token) {
    return <SectionError response={{ code: 401, message: "Unauthorized" }} />;
  }

  return (
    <div className="flex">
      <p>Dashboard</p>
    </div>
  );
}
