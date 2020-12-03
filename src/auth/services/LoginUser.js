// llamamos a la librería

import { httpRequest } from "../../sdk/http/request";
import config from "../config";

export default async () => {
  const options = {
    url: `${config.BASE_URL}/login`,
    method: "POST",
    body: {
      login: config.ADMIN_USER,
      password: config.ADMIN_PASSWORD,
      role: "PAO_ADMIN"
    },
    headers: {
      "Content-Type": "application/json"
    }
  };
  const response = await httpRequest(options);
  return response;
};

export const PostLoginUser = async (body, fullResponse = false) => {
  const options = {
    url: `${config.BASE_URL}/login`,
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  // console.log(options.url)
  return httpRequest(options);
};

export const GetInfoUserProfile = async (
  userId,
  profile,
  fullResponse = false
) => {
  const options = {
    url: `${config.BASE_URL}/users/${userId}/${profile}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse: true
  };
  return httpRequest(options);
};

// obtiene el perfil de la persona logueada con su token

export const GetProfileMe = async (token, fullResponse = false) => {
  const options = {
    url: `${config.BASE_URL}/profiles/me`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    fullResponse: true
  };
  return httpRequest(options);
};
