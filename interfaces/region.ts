// {
//     "id": 12,
//     "name": "JAWA BARAT",
//     "long": 107.668887,
//     "lat": -7.090911,
//     "created_by": "admin",
//     "created_at": "2024-09-18T21:33:52.707Z",
//     "updated_by": "",
//     "updated_at": "1900-01-01T00:00:00Z"
// }
export interface IProvinces {
  id: number;
  name: string;
  long: number;
  lat: number;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
}

// {
//     "id": 179,
//     "province_id": 12,
//     "name": "KOTA BOGOR",
//     "lat": -6.5971469,
//     "long": 106.8060388,
//     "created_by": "admin",
//     "created_at": "2024-09-18T21:36:51.657Z",
//     "updated_by": "",
//     "updated_at": "1900-01-01T00:00:00Z"
// }

export interface ICities {
  id: number;
  province_id: number;
  name: string;
  lat: number;
  long: number;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
}

// {
//     "id": 2502,
//     "name": "BOGOR UTARA",
//     "city_id": 179,
//     "lat": -6.5708377,
//     "long": 106.8237374,
//     "created_by": "admin",
//     "created_at": "2024-09-18T21:38:27.537Z",
//     "updated_by": "",
//     "updated_at": "1900-01-01T00:00:00Z"
// }
export interface IDistricts {
  id: number;
  name: string;
  city_id: number;
  lat: number;
  long: number;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
}

// {
//     "id": 25435,
//     "name": "CIMAHPAR",
//     "district_id": 2502,
//     "created_by": "admin",
//     "created_at": "2024-09-18T21:39:26.3Z",
//     "updated_by": "",
//     "updated_at": "1900-01-01T00:00:00Z"
// }
export interface IVillages {
  id: number;
  name: string;
  district_id: number;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
}
