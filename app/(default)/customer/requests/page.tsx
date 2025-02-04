import { ReactNode } from "react";
import DynamicSidebar from "@/components/sidebar";
import { cookies } from "next/headers";
import { getCookie, getDecodedToken } from "@/lib/jwt";
import { Metadata } from "next";
import DynamicDropdown from "../_components/dropdown";
import SectionError from "@/components/errors/error-page";
import { Button } from "@mantine/core";
import Link from "next/link";
import { Input } from "@mantine/core";
import { FormInput } from "../_components/form";
import FireInsuranceForm from "./FireInsuranceForm";

export const metadata: Metadata = {
  title: "requests",
};

export default function CustomerPage() {
  const access_token = cookies().get("access_token")?.value;
  if (!access_token) {
    return <SectionError response={{ code: 401, message: "Unauthorized" }} />;
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Asuransi Kebakaran
        </h1>
        <FireInsuranceForm token={access_token} />
      </div>
    </div>
  );
}
