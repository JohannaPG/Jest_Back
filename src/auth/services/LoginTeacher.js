// llamamos a la librería

import { httpRequest } from "../../sdk/http/request";
import config from "../config";

export const PostLoginTeacher = async (body, fullResponse = false) => {
  const options = {
    url: `${config.BASE_URL}/login`,
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  //console.log(options.url)
  return httpRequest(options);
};
