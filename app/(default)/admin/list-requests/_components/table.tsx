"use client";

import { API } from "@/lib/api";
import { toast } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface RequestData {
  policy_number: string;
  coverage: string;
  invoice_number: string;
  status: string;
}

interface DataTableProps {
  token: string;
}

const DataTable: React.FC<DataTableProps> = ({ token }) => {
  const [data, setData] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.GET("insurance-request", token);
        if (response.code === 200) {
          setData(response.data);
        } else {
          toast.fire({
            title: response.message,
            icon: "error",
            padding: "10px 20px",
          });
        }
      } catch (err: any) {
        toast.fire({
          title: err.message,
          icon: "error",
          padding: "10px 20px",
        });
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              No Polis
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Jenis Penanggung
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              No Invoice
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Status
            </th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2 text-sm text-gray-800">
                {item.policy_number}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {item.coverage}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {item.invoice_number}
              </td>
              <td
                className={`px-4 py-2 text-sm ${
                  item.status === "Sudah Dibayar"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.status}
              </td>
              <td className="px-4 py-2 text-right">
                <button className="text-sm text-blue-500 hover:underline">
                  Lihat Rincian
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
