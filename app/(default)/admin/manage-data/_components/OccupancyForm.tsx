"use client";

import React, { useState } from "react";
import { API } from "@/lib/api"; // Pastikan path import sesuai lokasi fungsi POST Anda
import { toast } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface OccupancyFormProps {
  token: string; // Token untuk otentikasi
  onSuccess?: () => void; // Callback jika berhasil submit
}

const OccupancyForm: React.FC<OccupancyFormProps> = ({ token, onSuccess }) => {
  const [code, setCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [rate, setRate] = useState<number | "">("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = { code, name, rate };
      const response = await API.POST("occupancy", payload, token); // Gunakan fungsi POST

      if (response.code !== 201) {
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

      router.push("/admin/manage-data");
      setCode("");
      setName("");
      setRate("");

      if (onSuccess) onSuccess(); // Panggil callback jika ada
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow rounded"
    >
      <div className="mb-4">
        <label
          htmlFor="code"
          className="block text-sm font-medium text-gray-700"
        >
          Kode Occupancy
        </label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Masukkan kode occupancy"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nama Occupancy
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Masukkan nama occupancy"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="rate"
          className="block text-sm font-medium text-gray-700"
        >
          Rate Occupancy
        </label>
        <input
          type="number"
          id="rate"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
          className="w-full p-2 border rounded"
          placeholder="Masukkan rate occupancy"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Simpan
      </button>
    </form>
  );
};

export default OccupancyForm;
