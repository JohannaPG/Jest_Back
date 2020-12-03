import { userAuthMaker, userAuthLogin } from "../models/auth/auth_user";
import { UserCustomAuthSchema } from "../models/auth/schema_user";
import { SelectAuthByUserId, Selectprofile } from "../../src/auth/querys/index";
import { PostCreateUserCustom } from "../../src/auth/services/CreateUserCustom";
import { GetProfileMe, PostLoginUser } from "../../src/auth/services/LoginUser";
import { matchers } from "jest-json-schema";

expect.extend(matchers);

describe("Crear usuario custom con rol estudiante y loguearse satisfactoriamente", () => {
  const role = "STUDENT";
  const student = userAuthMaker(role);

  it("Crear usuario custom con rol estudiante", async () => {
    expect.assertions(5);

    const { status, data } = await PostCreateUserCustom(student, true);
    expect(status).toBe(200);

    let results = await SelectAuthByUserId(data.data.id);
    expect(results[0].user_id).toEqual(data.data.id);
    expect(results[0].roles).toEqual(role);
    expect(results[0].provider).toEqual(student.auth.provider);
    expect(results[0].login).toEqual(student.email);
  });

  it("Loguear usuario estudiante y obtener datos del perfil", async () => {
    expect.assertions(8);

    const body = userAuthLogin(student.email, student.auth.password, role);
    const data_login = await PostLoginUser(body, true);
    expect(data_login.status).toBe(200);
    const token = data_login.data.data.token;
    const data_get = await GetProfileMe(token, true);
    expect(data_get.status).toBe(200);
    const userId = data_get.data.data.userId;

    let results = await Selectprofile(userId);
    expect(results[0].code).toEqual(student.code);
    expect(results[0].document_type).toEqual(student.documentType);
    expect(results[0].document_number).toEqual(student.documentNumber);
    expect(results[0].first_name).toEqual(student.firstName);
    expect(results[0].last_name).toEqual(student.lastName);
    expect(results[0].email).toEqual(student.email);
  });

  it("Validar esquema json", async () => {
    const body = userAuthLogin(student.email, student.auth.password, role);
    const data_login = await PostLoginUser(body, true);
    expect(data_login.status).toBe(200);
    const token = data_login.data.data.token;
    const data_get = await GetProfileMe(token, true);
    const schema = data_get.data;
    const schema_base = UserCustomAuthSchema();
    expect(schema).toMatchSchema(schema_base);
  });
});

describe("Crear usuario custom con rol profesor y loguearse satisfactoriamente", () => {
  const role = "PAO_TEACHER";
  const teacher = userAuthMaker(role);
  it("Crear usuario custom con rol profesor", async () => {
    expect.assertions(5);

    const { status, data } = await PostCreateUserCustom(teacher, true);
    expect(status).toBe(200);
    let results = await SelectAuthByUserId(data.data.id);
    expect(results[0].user_id).toEqual(data.data.id);
    expect(results[0].roles).toEqual(role);
    expect(results[0].provider).toEqual(teacher.auth.provider);
    expect(results[0].login).toEqual(teacher.email);
  });

  it("Loguear usuario y obtener datos del perfil", async () => {
    expect.assertions(8);

    const body = userAuthLogin(teacher.email, teacher.auth.password, role);
    const data_login = await PostLoginUser(body, true);
    expect(data_login.status).toBe(200);
    const token = data_login.data.data.token;
    const data_get = await GetProfileMe(token, true);
    expect(data_get.status).toBe(200);
    const userId = data_get.data.data.userId;

    let results = await Selectprofile(userId);
    expect(results[0].code).toEqual(teacher.code);
    expect(results[0].document_type).toEqual(teacher.documentType);
    expect(results[0].document_number).toEqual(teacher.documentNumber);
    expect(results[0].first_name).toEqual(teacher.firstName);
    expect(results[0].last_name).toEqual(teacher.lastName);
    expect(results[0].email).toEqual(teacher.email);
  });
  it("Validar esquema json", async () => {
    const body = userAuthLogin(teacher.email, teacher.auth.password, role);
    const data_login = await PostLoginUser(body, true);
    expect(data_login.status).toBe(200);
    const token = data_login.data.data.token;
    const data_get = await GetProfileMe(token, true);
    const schema = data_get.data;
    const schema_base = UserCustomAuthSchema();
    expect(schema).toMatchSchema(schema_base);
  });
});
