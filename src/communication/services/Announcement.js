// llamamos a la librería

import { httpRequest } from "../../sdk/http/request";
import config from "../config";

// Genera un nuevo anuncio
export const PostCreateAnnouncement = async (body, fullResponse = false) => {
  const options = {
    url: `${config.BASE_URL}/announcement`,
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

// Retorna un anuncio
export const GetReturnsAnnouncement = async (
  announcement_id,
  fullResponse = false
) => {
  const options = {
    url: `${config.BASE_URL}/announcement/${announcement_id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  return httpRequest(options);
};

// Cambia el estado de un anuncio a cancelado
export const PutCancelAnnouncement = async (
  announcement_id,
  body,
  fullResponse = false
) => {
  const options = {
    url: `${config.BASE_URL}/announcement/${announcement_id}/to-cancel`,
    method: "PUT",
    body,
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  return httpRequest(options);
};

export const GetFilterAnnouncement = async (
  author_id,
  page,
  filter,
  fullResponse = false
) => {
  const options = {
    url: `${config.BASE_URL}/announcement/author/${author_id}/${page}/?filter=${filter}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  return httpRequest(options);
};
