import React, { useEffect, useState } from "react";
import EditOccupancyForm from "../_components/EditOccupancyForm";
import SectionError from "@/components/errors/error-page";
import { cookies } from "next/headers";

const EditOccupancyPage: React.FC = () => {
  const access_token = cookies().get("access_token")?.value;
  if (!access_token) {
    return <SectionError response={{ code: 401, message: "Unauthorized" }} />;
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Occupancy</h1>
      <EditOccupancyForm token={access_token} />
    </div>
  );
};

export default EditOccupancyPage;
