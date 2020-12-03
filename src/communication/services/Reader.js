// llamamos a la librería

import { httpRequest } from "../../sdk/http/request";
import config from "../config";


// Retorna la lista de los anuncios de un alumno
export const GetReturnsListAnnouncement = async (
  id,
  pag,
  fullResponse = false
) => {
  const options = {
    url: `${config.BASE_URL}/announcement/reader/${id}/${pag}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse: true
  };
  // console.log(options.url)
  return httpRequest(options);
};

// Retorna el total de anuncios no vistos
export const GetReturnsTotAnnouNotSeen = async (id, fullResponse = false) => {
  const options = {
    url: `${config.BASE_URL}/announcement/reader/${id}/total-not-seen`,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse: true
  };
  //console.log(options.url)
  return httpRequest(options);
};

// Cambia el estado a Leido de un anuncio
export const PutChangeReadAnnouncement = async (
  id,
  body,
  fullResponse = false
) => {
  const options = {
    url: `${config.BASE_URL}/announcement/reader/${id}/to-seen`,
    method: "PUT",
    body,
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  return httpRequest(options);
};


export const GetAdSearchByTitle = async (
  reader_id,
  page,
  title,
  fullResponse = false
) => {
  const options = {
    url: `${config.BASE_URL}/announcement/reader/${reader_id}/${page}/?title=${title}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  return httpRequest(options);
};

