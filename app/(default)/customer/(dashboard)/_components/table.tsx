"use client";

import { API } from "@/lib/api";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface RequestData {
  id: string;
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

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.GET("insurance-request/my-request", token);
        if (response.code === 200) {
          setData(response.data);
        } else {
          throw new Error(response.message || "Gagal mengambil data");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDetail = (id: string) => {
    router.push(`/shared/finance/${id}`);
  };
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
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
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
                <button
                  className="text-sm text-blue-500 hover:underline"
                  onClick={() => handleDetail(item.id)}
                >
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
