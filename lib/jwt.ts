import { decodeJwt } from "jose";

export interface MyToken {
  aud: string;
  exp: number;
  jti: string;
  iss: string;
  sub: string;
  Level: "1" | "2" | "3" | "4";
}

export function getDecodedToken(token: string) {
  const decoded = decodeJwt<MyToken>(token);
  return decoded;
}

// ah masih bug ni
export function getClientCookieValue(name: string) {
  const cookies = document.cookie;
  const nameEQ = name + "=";
  const ca = cookies.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}

export function getCookie(name: string) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null; // Jika cookie tidak ditemukan
}
