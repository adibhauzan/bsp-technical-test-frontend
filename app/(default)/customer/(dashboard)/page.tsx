import { ReactNode } from "react";
import DynamicSidebar from "@/components/sidebar";
import { cookies } from "next/headers";
import { getCookie, getDecodedToken } from "@/lib/jwt";
import { Metadata } from "next";
import SectionError from "@/components/errors/error-page";
import DataTable from "./_components/table";

export const metadata: Metadata = {
  title: "dashboard",
};

export default function AdminPage() {
  const access_token = cookies().get("access_token")?.value;
  if (!access_token) {
    return <SectionError response={{ code: 401, message: "Unauthorized" }} />;
  }
  return (
    <div className="flex">
      <DataTable token={access_token} />
    </div>
  );
}
