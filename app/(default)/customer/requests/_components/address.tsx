import React from "react";

interface AddressInputProps {
  address: string;
  setAddress: (value: string) => void;
  province: string;
  setProvince: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  district: string;
  setDistrict: (value: string) => void;
  village: string;
  setVillage: (value: string) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({
  address,
  setAddress,
  province,
  setProvince,
  city,
  setCity,
  district,
  setDistrict,
  village,
  setVillage,
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor="address"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Alamat Objek Pertanggungan
      </label>
      <textarea
        id="address"
        rows={3}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Masukkan alamat lengkap"
      ></textarea>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="province"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Provinsi
          </label>
          <input
            type="text"
            id="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Masukkan provinsi"
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Kota/Kabupaten
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Masukkan kota/kabupaten"
          />
        </div>

        <div>
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Kecamatan
          </label>
          <input
            type="text"
            id="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Masukkan kecamatan"
          />
        </div>

        <div>
          <label
            htmlFor="village"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Desa/Kelurahan
          </label>
          <input
            type="text"
            id="village"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Masukkan desa/kelurahan"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressInput;
