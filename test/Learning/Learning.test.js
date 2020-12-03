import { GetListStudentEnrolledClass } from "../../src/learning/services/Learning_enrollments";
import { SelectEnrollment } from "../../src/learning/querys/index_Learning";
import {
  idCourse_1,idSection_1
} from "../../utilities";
describe("Test GET : Listado de alumno por salón", () => {
  test("Validar que liste alumnos matriculados de un salon", async () => {
    const { data, status } = await GetListStudentEnrolledClass(
      idCourse_1,
      idSection_1,
      true
    );
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("OK");
    expect(data.success).toEqual(true);
    expect(data.data.enrollments).toBeDefined();

    for (let i = 0; i < data.data.length; i++) {
      let item = data.data.enrollments[i];
      let results2 = await SelectEnrollment(idSection_1, idCourse_1);
      expect(results2[i].course_id).toEqual(item.courseId);
      expect(results2[i].section_id).toEqual(item.sectionId);
      expect(results2[i].user_id).toEqual(item.userId);
    }
  });
  test("Validar que NO liste alumnos matriculados de un salon al mandar id de course inexistente", async () => {
    const { data, status } = await GetListStudentEnrolledClass(
      "119490d8-a853-4323-b5a8-77dc73b7eff6",
      "6c97cd07-663b-3992-93bc-569fe8d342bC",
      true
    );
    expect(data).toEqual({
      code: 2,
      data: {
        enrollments: [],
      },
      message: "OK",
      success: true,
    });
  });
  test("Validar que NO liste alumnos matriculados si no se envia los parametros correctos", async () => {
    const { data, status } = await GetListStudentEnrolledClass(
      "Holi1",
      "6c97cd07-663b-Holi2-93bc-569fe8d342bC",
      true
    );
    expect(data).toEqual({
      code: 400000008,
      data: {},
      message: "El id no es un valor válido",
      success: false,
    });
  });
});
