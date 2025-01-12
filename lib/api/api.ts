"use server";

import { BASE_URL } from "./baseUrl";

export type TParams = {
  value?: string;
  name?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortDirection?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  filter?: string;
};

export const GETSTOREPROCEDURE = async (
  path: string,
  token: string,
  params?: TParams
) => {
  const header = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token || null}`,
  };

  const filteredParams: Record<string, string> = {};
  if (params?.value) filteredParams.value = params.value;
  if (params?.name) filteredParams.name = params.name;
  if (params?.sortBy) filteredParams.sortBy = params.sortBy;
  if (params?.page) filteredParams.page = params.page;
  if (params?.limit) filteredParams.limit = params.limit;
  if (params?.sortDirection)
    filteredParams.sortDirection = params.sortDirection;
  if (params?.status) filteredParams.status = params.status;
  if (params?.startDate) filteredParams.startDate = params.startDate;
  if (params?.endDate) filteredParams.endDate = params.endDate;
  if (params?.filter) filteredParams.filter = params.filter;

  const queryString = Object.keys(filteredParams).length
    ? "?" + new URLSearchParams(filteredParams).toString()
    : "";
  const fullURL = `${BASE_URL}/${path}${queryString}`;
  try {
    const res = await fetch(fullURL, {
      method: "GET",
      headers: header,
      next: { tags: [path] },
    });

    const response = await res.json();
    return response;
  } catch (error: any) {
    return { code: 500, message: error.message, data: null, status: "ERROR" };
  }
};

export const GET = async (path: string, token: string, params?: any) => {
  const header = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token || null}`,
  };
  console.log(`${BASE_URL}/${path}`);
  try {
    const res = await fetch(
      `${BASE_URL}/${path}${
        params ? "?" + new URLSearchParams(params).toString() : ""
      }`,
      {
        method: "GET",
        headers: header,
        next: { tags: [path] },
      }
    );

    const response = await res.json();
    return response;
  } catch (error: any) {
    return { code: 500, message: error.message, data: null, status: "ERROR" };
  }
};

export const POST = async (
  path: string,
  data: any,
  token?: string,
  isAuth?: boolean,
  isFormData?: boolean
) => {
  const headers: { [key: string]: string } = {
    Authorization: `Bearer ${token || ""}`,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  const endpoint = `${BASE_URL}/${path}${!isAuth ? "/create" : ""}`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: isFormData ? data : JSON.stringify(data),
      next: { tags: [path] },
    });

    const response = await res.json();
    return response;
  } catch (error: any) {
    return { code: 500, message: error.message, data: null, status: "ERROR" };
  }
};

export const POSTPROCEDURE = async (
  path: string,
  data: any,
  token?: string,
  isFormData?: boolean
) => {
  const headers: { [key: string]: string } = {
    Authorization: `Bearer ${token || ""}`,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const endpoint = `${BASE_URL}/${path}`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: isFormData ? data : JSON.stringify(data), // Serialize body jika bukan FormData
      next: { tags: [path] },
    });

    const response = await res.json();
    return response;
  } catch (error: any) {
    return { code: 500, message: error.message, data: null, status: "ERROR" };
  }
};

export const PUT = async (
  path: string,
  data?: any,
  token?: string,
  isFormData?: boolean
) => {
  const header: { [key: string]: string } = {
    Authorization: `Bearer ${token || null}`,
  };

  if (!isFormData) {
    header["Content-Type"] = "application/json";
  }

  const endpoint = `${BASE_URL}/${path}${"/update"}`;

  try {
    const res = await fetch(endpoint, {
      method: "PUT",
      headers: header,
      body: isFormData ? data : JSON.stringify(data),
      next: { tags: [path] },
    });

    const response = await res.json();
    return response;
  } catch (error: any) {
    return { code: 500, message: error.message, data: null, status: "ERROR" };
  }
};

export const PUTWithoutBody = async (
  path: string,
  subPath: string,
  token?: string
) => {
  const header = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token || null}`,
  };

  const endpoint = `${BASE_URL}/${path}${subPath}`;
  try {
    const res = await fetch(endpoint, {
      method: "PUT",
      headers: header,
      next: { tags: [path] },
    });

    const response = await res.json();
    return response;
  } catch (error: any) {
    return { code: 500, message: error.message, data: null, status: "ERROR" };
  }
};

export const DELETE = async (path: string, token?: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${path}${"/delete"}`, {
      method: "DELETE",
      next: { tags: [path] },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || null}`,
      },
    });

    const response = await res.json();
    return response;
  } catch (error: any) {
    return { code: 500, message: error.message, data: null, status: "ERROR" };
  }
};

export const DELETENEW = async (
  moduleTag: string,
  bodyKey: string,
  id: string | number,
  token: string
) => {
  const body = {
    [bodyKey]: id,
  };
  try {
    const res = await fetch(`${BASE_URL}/${moduleTag}/delete`, {
      method: "DELETE",
      next: { tags: [moduleTag] },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await res.json();
    return response;
  } catch (error: any) {
    return { code: 500, message: error.message, data: null, status: "ERROR" };
  }
};
