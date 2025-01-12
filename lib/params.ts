export type TParams<T> = {
  filter: keyof T;
  text: string;
  sortBy: keyof T;
  sortDirection: "asc" | "desc";
  page: number;
  limit: number;
  active?: 0 | 1 | 2;
  status?: "active" | "inactive" | "All";
};

export type SearchParamsProps<T> = {
  searchParams?: {
    filter?: keyof T;
    text?: string;
    sortBy?: keyof T;
    sortDirection?: "asc" | "desc";
    active?: string | number;
    status?: "active" | "inactive" | "All";
    page?: string;
    limit?: string;
    hideCols?: string;
    stickCols?: string;
    page_size?: string;
  };
};

export const getAllData = (limit: number) => {
  return {
    filter: "code",
    text: "%%",
    sortBy: "code",
    sortDirection: "asc",
    page: 1,
    limit: limit,
  };
};

export type TParamsInsurancePartner<T> = {
  insurance_application_number: string;
  page: number;
  limit: number;
};
