import { TSelectOption } from "@/interfaces/other";
import { ICities, IDistricts, IVillages } from "@/interfaces/region";
import ReactSelect from "react-select";

export const cityOptions = (
  provinceId: number | undefined,
  cities: ICities[] | { [key: number]: ICities[] },
  touched: boolean | undefined,
  errors: string | undefined,
  handleCityChange: any,
  setFieldValue: any,
  index?: number
) => {
  const cityData =
    typeof cities === "object" && !Array.isArray(cities)
      ? cities[index ?? 0] || []
      : cities;
  const citiesSelectOptions: TSelectOption[] = cityData.map((city) => ({
    label: city.name,
    value: city.name,
  }));

  if (provinceId) {
    return (
      <ReactSelect
        className={`${touched && errors ? "border border-danger placeholder-danger" : ""} rounded`}
        isSearchable
        isClearable
        options={citiesSelectOptions}
        onChange={(event: any) => handleCityChange(event?.value, setFieldValue)}
        name="city"
      />
    );
  } else {
    return (
      <ReactSelect
        isDisabled
        placeholder="Please select a province first"
        options={[]}
      />
    );
  }
};

export const districtOptions = (
  cityId: number | undefined,
  districts: { [key: number]: IDistricts[] },
  touched: boolean | undefined,
  errors: string | undefined,
  handleDistrictChange: any,
  setFieldValue: any,
  index?: number
) => {
  const districtData =
    typeof districts === "object" && !Array.isArray(districts)
      ? districts[index ?? 0] || []
      : districts;
  const districtsSelectOptions: TSelectOption[] = districtData.map(
    (district) => ({
      label: district.name,
      value: district.name,
    })
  );

  if (cityId) {
    return (
      <ReactSelect
        className={`${touched && errors ? "border border-danger placeholder-danger" : ""} rounded`}
        isSearchable
        isClearable
        options={districtsSelectOptions}
        onChange={(event: any) =>
          handleDistrictChange(event?.value, setFieldValue)
        }
        name="district"
      />
    );
  } else {
    return <ReactSelect isDisabled placeholder="Please select a city first" />;
  }
};

export const villageOptions = (
  districtId: number | undefined,
  villages: { [key: number]: IVillages[] },
  touched: boolean | undefined,
  errors: string | undefined,
  handleVillageChange: any,
  setFieldValue: any,
  index?: number
) => {
  const villageData =
    typeof villages === "object" && !Array.isArray(villages)
      ? villages[index ?? 0] || []
      : villages;
  const villagesSelectOptions: TSelectOption[] = villageData.map((village) => ({
    label: village.name,
    value: village.name,
  }));

  if (districtId) {
    return (
      <ReactSelect
        className={`${touched && errors ? "border border-danger placeholder-danger" : ""} rounded`}
        isSearchable
        isClearable
        options={villagesSelectOptions}
        onChange={(event: any) =>
          handleVillageChange(event?.value, setFieldValue)
        }
        name="village"
      />
    );
  } else {
    return (
      <ReactSelect isDisabled placeholder="Please select a district first" />
    );
  }
};
