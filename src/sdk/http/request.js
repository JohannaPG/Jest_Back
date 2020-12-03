// // exponer la librería de http luego en toda la aplicación solo llamemos al metodo

import axios from "axios";

export const httpRequest = async parameters => {
  const {
    url = "",
    method = "GET",
    headers,
    qs,
    body,
    fullResponse = false
  } = parameters;
  try {
    const response = await axios({
      method,
      url,
      data: body,
      headers,
      params: qs
    });

    if (fullResponse) {
      return response;
    }
    return response.data;
  } catch (error) {
    //console.log(error);
    if (fullResponse) {
      return error.response;
    }
    return error.response.data;
  }
};
