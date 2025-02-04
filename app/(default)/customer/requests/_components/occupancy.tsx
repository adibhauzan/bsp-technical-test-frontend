"use client";

import { API } from "@/lib/api";
import React, { useEffect, useState } from "react";

interface Occupation {
  code: string;
  name: string;
}

interface OccupationSelectProps {
  value: string;
  setValue: (value: string) => void;
  token: string; // Token untuk otentikasi
}

const OccupationSelect: React.FC<OccupationSelectProps> = ({
  value,
  setValue,
  token,
}) => {
  const [options, setOptions] = useState<Occupation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOccupations = async () => {
      try {
        const response = await API.GET("occupancy", token); // Fetch data dari API
        if (response.code === 200) {
          // Cek status API
          setOptions(response.data); // Simpan data okupasi ke state
        } else {
          throw new Error(response.message || "Failed to fetch data");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOccupations();
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mb-4">
      <label
        htmlFor="occupation"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Okupasi
      </label>
      <select
        id="occupation"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="" disabled>
          Pilih Okupasi
        </option>
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OccupationSelect;
