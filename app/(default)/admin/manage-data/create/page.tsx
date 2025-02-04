import React from "react";
import OccupancyForm from "../_components/OccupancyForm";
import { cookies } from "next/headers";
import SectionError from "@/components/errors/error-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Occupancy",
};

const CreateOccupancyPage = () => {
  const access_token = cookies().get("access_token")?.value;
  if (!access_token) {
    return <SectionError response={{ code: 401, message: "Unauthorized" }} />;
  }

  return <OccupancyForm token={access_token} />;
};

export default CreateOccupancyPage;
