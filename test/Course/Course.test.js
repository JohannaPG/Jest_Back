import { CreateCourse } from "../../src/course/services/Course";
import { GetCourse, UpdateCourse } from "../../src/course/services/Course";
import { courseMaker, courseMakerUpdate } from "../models/course/course";
import CreateAdminToken from "../../src/auth/services/LoginUser";
import { SelectCourseByCourseId } from "../../src/course/querys/index_Course";
import { SelectCourseByCourseCode } from "../../src/course/querys/index_Course";

let REQUEST_TOKEN = "";

beforeAll(async () => {
  const { data } = await CreateAdminToken();
  REQUEST_TOKEN = data.token;
});

describe("Crear curso válido y actualizar atributos permitidos", () => {
  const course = courseMaker();
  it("Crear y obtener un curso con estructura válida", async () => {
    expect.assertions(4);
    const { status, data } = await CreateCourse(course, REQUEST_TOKEN, true);
    expect(status).toBe(200);

    let results = await SelectCourseByCourseId(data.data.id);
    expect(results[0].course_id).toEqual(data.data.id);

    const data_get = await GetCourse(data.data.id, REQUEST_TOKEN, true);
    expect(data_get.status).toBe(200);
    expect(data_get.data).toMatchSnapshot();
  });

  it("Actualizar curso de manera satisfactoria ", async () => {
    // expect.assertions(2);
    let results = await SelectCourseByCourseCode(course.code);
    const courseId = results[0].course_id;
    const courseUpdate = courseMakerUpdate();

    const { status, data } = await UpdateCourse(
      courseId,
      courseUpdate,
      REQUEST_TOKEN,
      true
    );

    expect(status).toBe(200);
    const data_get = await GetCourse(courseId, REQUEST_TOKEN, true);
    expect(data_get.data.data.contentTypes).toEqual(courseUpdate.contentTypes);
    expect(data_get.data.data.introduction).toEqual(courseUpdate.introduction);
    expect(data_get.data.data.name).toEqual(courseUpdate.name);
    expect(data_get.data.data.description).toEqual(courseUpdate.description);
    expect(data_get.data.data.achievements).toEqual(courseUpdate.achievements);
    expect(data_get.data.data.level).toEqual(courseUpdate.level);
    expect(data_get.data.data.language).toEqual(courseUpdate.language);
    //El atributo code no está permitido modificarse, por eso se valida contra el codigo inicial y que no debe haber cambiado
    expect(data_get.data.data.code).toEqual(results[0].code);
  });
});
