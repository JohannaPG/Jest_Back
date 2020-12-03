// llamamos a la librería

import { httpRequest } from "../../sdk/http/request";
import config from "../config";

// Listar alumnos matriculados en un salón
export const GetListStudentEnrolledClass = async (
  courseId,
  sectionId,
  fullResponse = false
) => {
  const options = {
    url: `${config.BASE_URL}/internal/courses/${courseId}/section/${sectionId}/enrollments`,
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    fullResponse
  };
  return httpRequest(options);
};
