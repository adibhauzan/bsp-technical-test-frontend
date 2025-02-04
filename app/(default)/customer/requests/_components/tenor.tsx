import React from "react";

interface TenorSelectProps {
  value: number;
  setValue: (value: number) => void;
}

const TenorSelect: React.FC<TenorSelectProps> = ({ value, setValue }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="tenor"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Jangka Waktu Pertanggungan
      </label>
      <select
        id="tenor"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value={0} disabled>
          Pilih Jangka Waktu Pertanggungan
        </option>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((tenor) => (
          <option key={tenor} value={tenor}>
            {tenor} Tahun
          </option>
        ))}
      </select>
    </div>
  );
};

export default TenorSelect;
