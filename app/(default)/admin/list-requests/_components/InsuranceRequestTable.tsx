"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter untuk navigasi
import { API } from "@/lib/api";
import { toast } from "@/lib/utils";

interface InsuranceRequest {
  id: string;
  policy_number: string;
  coverage: string;
  invoice_number: string;
  status: string;
  approve: number;
}

interface InsuranceRequestTableProps {
  token: string;
}

const InsuranceRequestTable: React.FC<InsuranceRequestTableProps> = ({
  token,
}) => {
  const [data, setData] = useState<InsuranceRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.GET("insurance-request", token);
        if (response.code === 200) {
          setData(response.data);
        } else {
          setError(response.message);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleApprove = async (id: string, approved: number) => {
    try {
      const response = await API.APPROVE(
        `insurance-request/${id}`,
        {
          approve: approved,
        },
        token
      );

      if (response.code === 200) {
        toast.fire({
          title: "Perubahan berhasil disimpan!",
          icon: "success",
          padding: "10px 20px",
        });
        window.location.reload();
      } else {
        toast.fire({
          title: response.message,
          icon: "error",
          padding: "10px 20px",
        });
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDetail = (id: string) => {
    router.push(`/shared/finance/${id}`);
  };

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
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Aksi
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Approve
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
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
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDetail(item.id)} // Panggil handleDetail
                  className="text-sm text-blue-500 hover:underline"
                >
                  Lihat Rincian
                </button>
              </td>
              <td className="px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={item.approve === 1}
                  disabled={item.approve === 1} // Nonaktifkan checkbox jika approve sudah 1
                  onChange={(e) =>
                    handleApprove(item.id, e.target.checked ? 1 : 0)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InsuranceRequestTable;
