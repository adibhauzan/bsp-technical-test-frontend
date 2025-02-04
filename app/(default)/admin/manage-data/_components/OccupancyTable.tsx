"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/lib/api";
import { toast } from "@/lib/utils";

interface Occupancy {
  id: string; // ID sebagai number
  code: string;
  name: string;
  rate: number;
}

interface OccupancyTableProps {
  token: string; // Token untuk otentikasi
}

const OccupancyTable: React.FC<OccupancyTableProps> = ({ token }) => {
  const [data, setData] = useState<Occupancy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOccupancies = async () => {
      try {
        const response = await API.GET("occupancy", token);
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
      } finally {
        setLoading(false);
      }
    };

    fetchOccupancies();
  }, [token]);

  const handleEdit = (id: string) => {
    console.log("Edit data with ID:", id);
    router.push(`/admin/manage-data/edit/${id}`); // Navigasi dengan ID number
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus occupancy ini?")) {
      try {
        const response = await API.DELETE(`occupancy/${id}`, token);
        if (!response.ok) {
          toast.fire({
            title: response.message,
            icon: "error",
            padding: "10px 20px",
          });
        }
        toast.fire({
          title: response.message,
          icon: "success",
          padding: "10px 20px",
        });
        setData(data.filter((item) => item.id !== id)); // Hapus dari state
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Kode
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Nama
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Rate
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2 text-sm text-gray-800">{item.code}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{item.name}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{item.rate}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(item.code)}
                  className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.code)}
                  className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OccupancyTable;
