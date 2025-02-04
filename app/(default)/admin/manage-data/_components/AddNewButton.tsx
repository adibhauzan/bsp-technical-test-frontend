"use client";

import React from "react";
import { useRouter } from "next/navigation";

const AddNewButton: React.FC = () => {
  const router = useRouter();

  const handleAddNew = () => {
    router.push("/admin/manage-data/create");
  };

  return (
    <button
      onClick={handleAddNew}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
    >
      Add New
    </button>
  );
};

export default AddNewButton;
