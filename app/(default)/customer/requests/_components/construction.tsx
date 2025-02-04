import React from "react";

interface ConstructionTypeProps {
  value: string;
  setValue: (value: string) => void;
}

const ConstructionType: React.FC<ConstructionTypeProps> = ({
  value,
  setValue,
}) => {
  const options = [
    {
      id: "1",
      title: "Kelas I",
      description:
        "Dinding, lantai, dan semua komponen penunjang strukturalnya serta penutup atap terbuat seluruhnya dan sepenuhnya dari bahan-bahan yang tidak mudah terbakar.",
    },
    {
      id: "2",
      title: "Kelas II",
      description:
        "Penutup atap terbuat dari sirap kayu keras, dinding-dinding mengandung bahan-bahan yang dapat terbakar sampai maksimum 20% dari luas dinding, lantai dan struktur-struktur penunjangnya terbuat dari kayu.",
    },
    {
      id: "3",
      title: "Kelas III",
      description: "Selain konstruksi Kelas I dan Kelas II.",
    },
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Konstruksi
      </label>
      {options.map((option) => (
        <div key={option.id} className="mb-2">
          <label className="flex items-start">
            <input
              type="radio"
              name="construction"
              value={option.id}
              checked={value === option.id}
              onChange={() => setValue(option.id)}
              className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div>
              <span className="font-semibold text-sm">{option.title}</span>
              <p className="text-gray-500 text-sm">{option.description}</p>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};

export default ConstructionType;
