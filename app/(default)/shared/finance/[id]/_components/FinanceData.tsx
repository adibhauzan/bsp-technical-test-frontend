"use client";

import { API } from "@/lib/api";
import { toast } from "@/lib/utils";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PremiumDetails {
  id: number;
  is_earthquake: string;
  tenor: number;
  invoice_number: string;
  building_price: number;
  basic_premi: number;
  total_payment: number;
  coverage: string;
  occupancy: string;
}

interface PremiumSummaryProps {
  token: string;
}

// Utility function for formatting currency in IDR
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// PremiumSummary React component
const PremiumSummary: React.FC<PremiumSummaryProps> = ({ token }) => {
  const { id } = useParams();
  const [premiumDetails, setPremiumDetails] = useState<PremiumDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await API.GET(`insurance-request/${id}`, token);
        console.log(response);
        if (response.code === 200) {
          setPremiumDetails(response?.data);
          console.log("response data :", response?.data);
        } else {
          toast.fire({
            icon: "error",
            title: response.message,
            padding: "10px 20px",
          });
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!premiumDetails) return <p>No data found.</p>;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="bg-white shadow-md rounded-lg px-12 pt-8 pb-10 mb-4">
        <h2 className="text-2xl font-semibold mb-6">
          Detail Penerangan Invoice
        </h2>
        <div className="grid grid-cols-4 gap-8 mb-4">
          <div className="flex flex-col col-span-1">
            <h3 className="text-lg font-semibold mb-2">Premi Terbaik</h3>
            <p>{premiumDetails?.coverage}</p>
            <p>{premiumDetails?.occupancy}</p>
            <p>No. Invoice: {premiumDetails?.invoice_number}</p>
          </div>
          <div className="flex flex-col col-span-1">
            <h3 className="text-lg font-semibold mb-2">Periode</h3>
            <p>{premiumDetails.tenor} Tahun</p>
          </div>
          <div className="flex flex-col col-span-1 items-center">
            <h3 className="text-lg font-semibold mb-2">Perlusaan</h3>
            <p className="text-center">
              {premiumDetails.is_earthquake === "1" ? "Gempa Bumi" : "-"}
            </p>
          </div>
          <div className="flex flex-col col-span-1">
            <h3 className="text-lg font-semibold mb-2">Harga Bangunan</h3>
            <p>{formatCurrency(premiumDetails.building_price)}</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8 mt-6">
          <div className="col-span-4">
            <div className="flex justify-end">
              <div className="flex flex-col w-64 space-y-4">
                <div className="flex justify-between">
                  <span>Premi Dasar:</span>
                  <span className="font-bold text-left">
                    {formatCurrency(premiumDetails.basic_premi)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Administrasi:</span>
                  <span className="font-bold text-left">IDR 10,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-bold text-left">
                    {formatCurrency(premiumDetails.total_payment)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSummary;
