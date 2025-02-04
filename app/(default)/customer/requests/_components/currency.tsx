import React from "react";

interface BuildingCostInputProps {
  value: number;
  setValue: (value: number) => void;
}

const BuildingCostInput: React.FC<BuildingCostInputProps> = ({
  value,
  setValue,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ""); // Hapus karakter non-numerik
    const numericValue = parseInt(inputValue, 10); // Ubah menjadi angka
    if (!isNaN(numericValue)) {
      setValue(numericValue); // Perbarui state di parent
    } else {
      setValue(0); // Atur ke 0 jika input tidak valid
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("id-ID", { maximumFractionDigits: 0 }); // Format angka tanpa desimal
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="buildingCost"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Harga Bangunan
      </label>
      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 rounded-l-md">
          Rp
        </span>
        <input
          type="text"
          id="buildingCost"
          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={formatNumber(value)} // Format nilai input saat ditampilkan
          onChange={handleChange}
          placeholder="Masukkan harga bangunan"
        />
      </div>
    </div>
  );
};

export default BuildingCostInput;
