"use client";

import React, { useEffect, useState } from "react";
import { API } from "@/lib/api"; // Import the GET function

interface DropdownProps {
  placeholder?: string;
  className?: string;
  withApi?: boolean;
  apiUrl?: string;
  token: string;
  valueKey: any; // Key to be used for value
  labelKey: any; // Key to be used for label
  options?: { value: any; label: any }[];
}

const DynamicDropdown: React.FC<DropdownProps> = ({
  className = "",
  placeholder = "Select an option",
  withApi = false,
  apiUrl = "",
  token,
  valueKey,
  labelKey,
  options = [],
}) => {
  const [dropdownOptions, setDropdownOptions] =
    useState<{ value: string; label: string }[]>(options);

  useEffect(() => {
    if (withApi && apiUrl) {
      const fetchOptions = async () => {
        try {
          // Call the GET function from API module
          const response = await API.GET(apiUrl, token);
          console.log("Fetched response:", response); // Log the full response

          if (response?.data && Array.isArray(response.data)) {
            setDropdownOptions(
              response.data.map((item: any) => ({
                value: item[valueKey], // Use dynamic value key
                label: item[labelKey], // Use dynamic label key
              }))
            );
          } else {
            console.error("Data is not an array or is missing:", response);
            setDropdownOptions([]); // Set to empty array as a fallback
          }
        } catch (error) {
          console.error("Failed to fetch dropdown options:", error);
          setDropdownOptions([]); // Set to empty array as a fallback
        }
      };

      fetchOptions();
    }
  }, [withApi, apiUrl, token, valueKey, labelKey]);

  return (
    <div className="relative w-full max-w-xs">
      <select className={`dropdown ${className}`}>
        <option value="">{placeholder}</option>
        {dropdownOptions.length > 0 ? (
          dropdownOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No options available
          </option>
        )}
      </select>
    </div>
  );
};

export default DynamicDropdown;
