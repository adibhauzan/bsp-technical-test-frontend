"use server";
import { TFormUser } from "@/interfaces/user";
import { TParams } from "../params";
import { API } from ".";
import { BASE_URL } from "./baseUrl";
import { IResponse } from "@/interfaces/response";

export const getLoggedInUser = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error while fetching user:", error);
    return {
      code: 500,
      status: error.message,
      message: "Error while fetching user",
      data: null,
    };
  }
};

export const getDetailUser = async (token: string, id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/user/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error while fetching user detail:", error);
    return {
      code: 500,
      status: error.message,
      message: "Error while fetching user detail",
      data: null,
    };
  }
};

export const getMstUsers = async (
  token: string,
  params?: TParams<TFormUser>
) => {
  const path = "user";
  try {
    ``;
    const response = await API.POSTPROCEDURE(path, params, token);
    return response;
  } catch (error) {
    console.error("Error Fetch table columns:", error);
  }
};

export const getMstUserById = async (token: string, id: number) => {
  const path = "user/get";
  const params = { id: Number(id) };

  try {
    const response = await API.POSTPROCEDURE(path, params, token);
    return response;
  } catch (error) {
    console.error("Error Fetch user by ID:", error);
    return {
      code: 500,
      message: "Error fetching user by ID",
      data: null,
      status: "ERROR",
    };
  }
};

export const createUser = async (token: string, data: FormData) => {
  try {
    // multipart/form-data
    const response = await fetch(`${BASE_URL}/user/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      next: { tags: ["users"] },
    });

    const responseJson: IResponse<null> = await response.json();
    return responseJson;
  } catch (error: any) {
    console.error("Error while creating user:", error);
    return {
      code: 500,
      status: error.message,
      message: "Error while creating user",
      data: null,
    };
  }
};

export const updateUser = async (token: string, data: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/user/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      next: { tags: ["users"] },
    });

    const responseJson: IResponse<null> = await response.json();
    return responseJson;
  } catch (error: any) {
    console.error("Error while updating user:", error);
    return {
      code: 500,
      status: error.message,
      message: "Error while updating user",
      data: null,
    };
  }
};

export const getProfileMe = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },

      next: { tags: ["profile"] },
    });

    const responseJson = await response.json();
    return responseJson;
  } catch (error: any) {
    console.error("Error while get profile user:", error);
    return {
      code: 500,
      status: error.message,
      message: "Error while get profile user",
      data: null,
    };
  }
};
