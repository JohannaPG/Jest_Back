// llamamos a la librería

import { httpRequest } from "../../sdk/http/request";
import config from "../config";

// Obtenga una sección por ID de maestro.
export const GetOneSectTeacher = async (teacherId, fullResponse = false) => {
  const options = {
    url: `${config.BASE_URL}/sections/search/teacher/${teacherId}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  return httpRequest(options);
};

// Crear una seccion relacionada a un curso
export const CreateSection = async (
  courseId,
  body,
  token,
  fullResponse = false
) => {
  const options = {
    url: `${config.BASE_URL}/admin/courses/${courseId}/sections`,
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    fullResponse
  };
  return httpRequest(options);
};
