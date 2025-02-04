import React from "react";
import OccupancyForm from "../../_components/OccupancyForm";

interface ASAIANSD {
  token: string;
}

export const itulah: React.FC<ASAIANSD> = ({ token }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tambah Occupancy Baru</h1>
      <OccupancyForm
        token={token}
        onSuccess={() => {
          alert("Berhasil membuat occupancy baru!");
        }}
      />
    </div>
  );
};
