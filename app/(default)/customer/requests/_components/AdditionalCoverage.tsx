import React from "react";

interface AdditionalCoverageProps {
  value: string;
  setValue: (value: string) => void;
}

const AdditionalCoverage: React.FC<AdditionalCoverageProps> = ({
  value,
  setValue,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked ? "1" : "0"); // Update state di parent
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Perlindungan Tambahan
      </label>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="earthquake"
          checked={value === "1"} // Checkbox dicentang jika value "1"
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="earthquake" className="ml-2 text-sm text-gray-700">
          Perlindungan terhadap gempa bumi
        </label>
      </div>
    </div>
  );
};

export default AdditionalCoverage;
