// llamamos a la librería

import { httpRequest } from "../../sdk/http/request";
import config from "../config";

export default async (student, token) => {
  const options = {
    url: `${config.BASE_URL}/admin/students`,
    method: "POST",
    body: student,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    fullResponse: true
  };
  return httpRequest(options);
};
