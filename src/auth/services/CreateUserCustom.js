// llamamos a la librería

import { httpRequest } from "../../sdk/http/request";
import config from "../config";

export const PostCreateUserCustom = async (body, fullResponse = true) => {
  const options = {
    url: `${config.BASE_URL}/admin-sapi/profiles`,
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `ApiKey ${config.API_KEY_AUTH}`
    },
    fullResponse
  };
  return httpRequest(options);
};
