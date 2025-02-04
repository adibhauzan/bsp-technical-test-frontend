import { ReactNode } from "react";
import DynamicSidebar from "@/components/sidebar";
import { cookies } from "next/headers";
import { getCookie, getDecodedToken } from "@/lib/jwt";
import { Metadata } from "next";
import OccupancyTable from "./_components/OccupancyTable";
import SectionError from "@/components/errors/error-page";
import AddNewButton from "./_components/AddNewButton";

export const metadata: Metadata = {
  title: "Manage - Data",
};

const ManageDataPage: React.FC = () => {
  const access_token = cookies().get("access_token")?.value;
  if (!access_token) {
    return <SectionError response={{ code: 401, message: "Unauthorized" }} />;
  }
  return (
    <div className="p-6">
      <AddNewButton />
      <h1 className="text-2xl font-bold mb-4">Manajemen Data Occupancy</h1>
      <OccupancyTable token={access_token} />
    </div>
  );
};

export default ManageDataPage;
