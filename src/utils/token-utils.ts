import { jwtDecode } from "jwt-decode";
import type JwtPayloadModel from "../types/jwt-payload";

export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const decodeToken = (token: string): null | JwtPayloadModel => {
  return jwtDecode<JwtPayloadModel>(token);
};

export const getUserSessionFromToken = (): JwtPayloadModel | null => {
  const token = getAccessToken();
  if (!token) {
    return null;
  }

  const decodedToken = decodeToken(token);
  return decodedToken || null;
};
