import {
  PostLoginUser,
  GetInfoUserProfile,
} from "../../src/auth/services/LoginUser";
import { Selectprofile } from "../../src/auth/querys/index";

describe("Login teacher test set_POST", () => {
  test.skip("Validar logueo de teacher, con usuario real", async () => {
    const body = {
      login: "c14025@utp.edu.pe",
      password: "Ymipolo?",
      role: "TEACHER",
    };

    const { data, status } = await PostLoginUser(body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        token: data.data.token,
        refreshToken: data.data.refreshToken,
      },
      message: "OK",
      success: true,
    });
  });
  test("Validar logueo de teacher, con usuario incorrecto", async () => {
    const body = {
      login: "c1402e@utp.edu.pe",
      password: "Ymipolo?",
      role: "TEACHER",
    };

    const { data, status } = await PostLoginUser(body, true);
    expect(data).toEqual({
      code: 401,
      data: {},
      message: "Bad credentials",
      success: false,
    });
  });
  test("Validar logueo de teacher, con contraseña incorrecta", async () => {
    const body = {
      login: "c14025@utp.edu.pe",
      password: "Ymipolo123",
      role: "TEACHER",
    };

    const { data, status } = await PostLoginUser(body, true);
    expect(data).toEqual({
      code: 401,
      data: {},
      message: "Bad credentials",
      success: false,
    });
  });
  test("Validar cuando se envia vacio usuario y contraseña", async () => {
    const body = {
      login: "",
      password: "",
      role: "TEACHER",
    };

    const { data, status } = await PostLoginUser(body, true);
    expect(data).toEqual({
      code: 420,
      data: {},
      message: "The login must not be empty",
      success: false,
    });
  });
  test("Validar cuando NO se envia usuario y contraseña", async () => {
    const body = {
      //login: "",
      //password: "",
      role: "TEACHER",
    };

    const { data, status } = await PostLoginUser(body, true);
    expect(data).toEqual({
      code: 420,
      data: {},
      message: "The login must not be empty",
      success: false,
    });
  });
  test("Validar logueo de teacher con role de estudiante", async () => {
    const body = {
      login: "c14025@utp.edu.pe",
      password: "Ymipolo?",
      role: "STUDENT",
    };

    const { data, status } = await PostLoginUser(body, true);
    expect(data).toEqual({
      code: 401,
      data: {},
      message: "Bad credentials",
      success: false,
    });
  });
  test("Validar logueo admin con rol teacher", async () => {
    const body = {
      login: "johannaQA2.teacher@pao.edu.p",
      password: "123456",
      role: "TEACHER",
    };

    const { data, status } = await PostLoginUser(body, true);
    expect(data).toEqual({
      code: 401,
      data: {},
      message: "Bad credentials",
      success: false,
    });
  });
});
