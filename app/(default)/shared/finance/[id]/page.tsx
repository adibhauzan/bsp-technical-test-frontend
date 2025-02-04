import React, { useEffect, useState } from "react";
import { cookies } from "next/headers";
import SectionError from "@/components/errors/error-page";
import PremiumSummary from "./_components/FinanceData";

const FinancePage: React.FC = () => {
  const access_token = cookies().get("access_token")?.value;
  if (!access_token) {
    return <SectionError response={{ code: 401, message: "Unauthorized" }} />;
  }
  return (
    <div className="p-6">
      <PremiumSummary token={access_token} />
    </div>
  );
};

export default FinancePage;
