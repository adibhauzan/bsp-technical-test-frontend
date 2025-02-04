import { ReactNode } from "react";
import DynamicSidebar from "@/components/sidebar";
import { cookies } from "next/headers";
import { getCookie, getDecodedToken } from "@/lib/jwt";
import { Button } from "@mantine/core";
import { Metadata } from "next";
import SectionError from "@/components/errors/error-page";
import Link from "next/link";
import Table from "./_components/tables";
import DataTable from "./_components/table";
import InsuranceRequestTable from "./_components/InsuranceRequestTable";

export const metadata: Metadata = {
  title: "requests",
};

export default function AdminLayout() {
  const access_token = cookies().get("access_token")?.value;
  if (!access_token) {
    return <SectionError response={{ code: 401, message: "Unauthorized" }} />;
  }

  return (
    <div className="flex">
      <InsuranceRequestTable token={access_token} />
    </div>
  );
}
