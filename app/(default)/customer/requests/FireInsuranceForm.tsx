"use client";

import React, { useState } from "react";

import { API } from "@/lib/api"; // Sesuaikan dengan lokasi API handler Anda
import TenorSelect from "./_components/tenor";
import OccupationSelect from "./_components/occupancy";
import BuildingCostInput from "./_components/currency";
import AddressInput from "./_components/address";
import ConstructionType from "./_components/construction";
import AdditionalCoverage from "./_components/AdditionalCoverage";
import { toast } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface FireInsuranceFormProps {
  token: string; // Parameter token diterima sebagai props
}

const FireInsuranceForm: React.FC<FireInsuranceFormProps> = ({ token }) => {
  const [tenor, setTenor] = useState<number>(0);
  const [occupancyCode, setOccupancyCode] = useState<string>("");
  const [buildingPrice, setBuildingPrice] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [village, setVillage] = useState<string>("");
  const [construction, setConstruction] = useState<string>("1");
  const [isEarthquake, setIsEarthquake] = useState<string>("0"); // Default value is "0"
  const router = useRouter();

  const handleSubmit = async () => {
    const formData = {
      tenor,
      occupancy_code: occupancyCode,
      building_price: buildingPrice,
      alamat: address,
      province,
      city,
      district,
      village,
      construction,
      is_earthquake: isEarthquake,
    };

    try {
      const response = await API.POST("insurance-request", formData, token);

      if (response.code === 201) {
        toast.fire({
          icon: "success",
          title: `${response.message}`,
          padding: "10px 20px",
        });
        router.push("/customer");
      } else {
        toast.fire({
          icon: "error",
          title: `${response.message}`,
          padding: "10px 20px",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Gagal mengirim form. Silakan coba lagi.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-6">Formulir Asuransi Kebakaran</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TenorSelect value={tenor} setValue={setTenor} />
        <OccupationSelect
          value={occupancyCode}
          setValue={setOccupancyCode}
          token={token}
        />
        <BuildingCostInput value={buildingPrice} setValue={setBuildingPrice} />
        <AddressInput
          address={address}
          setAddress={setAddress}
          province={province}
          setProvince={setProvince}
          city={city}
          setCity={setCity}
          district={district}
          setDistrict={setDistrict}
          village={village}
          setVillage={setVillage}
        />
        <ConstructionType value={construction} setValue={setConstruction} />
        <AdditionalCoverage value={isEarthquake} setValue={setIsEarthquake} />
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FireInsuranceForm;
