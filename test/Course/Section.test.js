import { GetOneSectTeacher } from "../../src/course/services/Section";
import { SelectSectionEvaluation } from "../../src/course/querys/index_Section";
import {
  idTeacher_1
} from "../../utilities";
describe("Test set section_GET", () => {
  const idTeacher_1_inco = "473c16f5-f42a-3747-b604-21222b6c002a";
  const idTeacher_1_letra = "holi";
  // Murio con el pase de Diandra
  test("Validar que se visualice las sesiones que enseña un teacher", async () => {
    const { data, status } = await GetOneSectTeacher(idTeacher_1, true);
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("OK");
    expect(data.success).toEqual(true);
    expect(data.data.sections).toBeDefined();

  });
  test("Validar que no regrese data, al enviar idTeacher_1 string", async () => {
    const { data, status } = await GetOneSectTeacher(idTeacher_1_letra, true);
    expect(data).toEqual({
      code: 400000008,
      data: {},
      message: "Uuid value no valid",
      success: false,
    });
  });
  test("Validar que no regrese data, al enviar idTeacher_1 vacio", async () => {
    const { data, status } = await GetOneSectTeacher("", false);
    expect(data).toEqual({
      status: 404,
      error: "Not Found",
      message: "No message available",
      path: "/sections/search/teacher",
      timestamp: data.timestamp,
    });
  });
});
