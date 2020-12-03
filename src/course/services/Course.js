// llamamos a la librería

import { httpRequest } from "../../sdk/http/request";
import config from "../config";

// Crear un curso
export const CreateCourse = async (course, token, fullResponse) => {
  const options = {
    url: `${config.BASE_URL}/admin/courses`,
    method: "POST",
    body: course,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    fullResponse
  };
  return httpRequest(options);
};

// Obtener un curso
export const GetCourse = async (courseId, token, fullResponse = false) => {
  const options = {
    url: `${config.BASE_URL}/admin/courses/${courseId}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    fullResponse
  };
  return httpRequest(options);
};

// Actualizar un curso
export const UpdateCourse = async (
  courseId,
  courseUpdate,
  token,
  fullResponse
) => {
  const options = {
    url: `${config.BASE_URL}/admin/courses/${courseId}`,
    method: "PATCH",
    body: courseUpdate,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    fullResponse
  };
  return httpRequest(options);
};
