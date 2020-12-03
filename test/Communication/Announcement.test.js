import {
  PostCreateAnnouncement,
  GetReturnsAnnouncement,
  PutCancelAnnouncement,
  GetFilterAnnouncement,
} from "../../src/communication/services/Announcement";
import {
  SelectAnnouncement,
  SelectAnnouNotSeen,
  SelectIdAnnou,
  SelectAnnouCancel,
  SelectAnnouPublish,
  SelectAnnouPublishAuthor,
  SelectAnnouScheduled,
  SelectAnnouScheduledAuthor,
} from "../../src/communication/querys/index_Announcement";
import {
  idTeacher_1,idCourse_1,idSection_1,idAdCanceled_1,filterPublished,filterScheduled
} from "../../utilities";

describe("Create Ads_POST", () => {
  test("Validate correct ad creation", async () => {
    const body = {
      title: "Creación de anuncio correcto",
      description:
        "Alumnos, las clases inician este lunes a las 10 am, aula C-215 QA",
      authorId: idTeacher_1,
      classRoomId: idSection_1,
      courseId: idCourse_1,
    };

    const { data} = await PostCreateAnnouncement(body, true);
    const id_anuncio = data.data.id;
    expect(data).toEqual({
      code: 2,
      data: {
        id: id_anuncio,
      },
      message: "SUCCESS",
      success: true,
    });

    // Validar registro de BD
    let results = await SelectAnnouncement(id_anuncio);
    expect(results[0].id).toEqual(id_anuncio);
    expect(results[0].author_id).toEqual(idTeacher_1);
    expect(results[0].description).toEqual(
        "Alumnos, las clases inician este lunes a las 10 am, aula C-215 QA"
    );
    expect(results[0].title).toEqual("Creación de anuncio correcto");
    expect(results[0].classroom_id).toEqual(idSection_1);
    expect(results[0].course_id).toEqual(idCourse_1);
  },8000);
  test("Validate that an untitled ad is not created", async () => {
    const body = {
      title: "",
      description: "Creación de anuncio correcto",
      authorId: idTeacher_1,
      classRoomId: idSection_1,
      courseId: idCourse_1,
    };
    const response = await PostCreateAnnouncement(body, false);
    expect(response).toEqual({
      code: 4,
      data: "El titulo es requerido",
      message: "null TypeString",
      success: false,
    });
  });
  test("Validate that an ad without description is not created", async () => {
    const body = {
      title: "Creación de anuncio correcto",
      description: "",
      authorId: idTeacher_1,
      classRoomId: idSection_1,
      courseId: idCourse_1,
    };
    const response = await PostCreateAnnouncement(body, false);
    expect(response).toEqual({
      code: 4,
      data: "La descripcion es requerida",
      message: "null TypeString",
      success: false,
    });
  });
  test("Validate that a sessionless ad is NOT created", async () => {
    const body = {
      title: "Creación de anuncio correcto",
      description: "PRueba QA",
      authorId: idTeacher_1,
      classRoomId: "",
      courseId: idCourse_1,
    };
    const response = await PostCreateAnnouncement(body, false);
    expect(response).toEqual({
      code: 4,
      data: "El classRoomId no es un valor válido",
      message: "valid TypeId",
      success: false,
    });
  });
  test.skip("Validate that an ad is not created if you send a session that does not belong to it", async () => {
    const body = {
      title: "Creación de anuncio correcto",
      description: "PRueba QA",
      authorId: idTeacher_1,
      classRoomId: "e610eecc-0c68-55c0-a106-971ae88a24fb",
      courseId: idCourse_1,
    };
    const response = await PostCreateAnnouncement(body, false);
    expect(response).toEqual({
      code: 4,
      data: "La sesion no es relacion con el teacher",
      message: "valid TypeId",
      success: false,
    });
  });
  test("Validate that no ad without course is created", async () => {
    const body = {
      title: "Creación de anuncio correcto",
      description: "PRueba QA",
      authorId: idTeacher_1,
      classRoomId: idSection_1,
      courseId: "",
    };
    const response = await PostCreateAnnouncement(body, false);
    expect(response).toEqual({
      code: 4,
      data: "El CourseId no es un valor válido",
      message: "valid TypeId",
      success: false,
    });
  });
  test("Validate creation of correct ad with + 100 characters of title and + 1000 characters in description", async () => {
    const body = {
      title:
        "Sesión 1: Pautas de Inicio Lunes 30 de Marzo del 2020 a las 7pm . Se desarrollará de manera OnLine mediante la plataforma ZOOM (Ver menú lado izquierdo Zoom)",
      description:
        "Un gusto saludarlos y darles la cordial bienvenida a nuestro curso Desarrollo  de una Cultura de Innovación!!!.Agradeceré tener presente que nuestra primera sesión inicia el lunes 30 de Marzo del 2020, revisar para nuestra primera sesión en la sección Semana 1: el Sílabo del curso (se adjunta también al presente).Les recomiendo revisen toda la información que les he publicado en la plataforma  CANVAS, es de su interés y de mucha importancia para nuestro curso que desarrollaremos juntos durante las próximas 9 sesiones. En la parte de Información General he consignado abundante material de lectura a manera de complemento y para los que deseen profundizar sus conocimientos.Finalmente, les pongo de conocimiento que de acuerdo al sílabo debemos aplicar controles de lecturas programados (los cuales serán sólo para marcar), ya se encuentran colgadas las lecturas y se tomarán en la sesión indicada (a partir de la 2da sesión).Será de mi agrado acompañarlos en su aprendizaje.Deseo estén todos bien y tomemos con calma esta situación de emergencia sanitaria .Quedo a su disposición, ante cualquier consulta o duda.",
      authorId: idTeacher_1,
      classRoomId: idSection_1,
      courseId: idCourse_1,
    };

    const { data } = await PostCreateAnnouncement(body, true);
    const id_anuncio = data.data.id;
    expect(data).toEqual({
      code: 2,
      data: {
        id: id_anuncio,
      },
      message: "SUCCESS",
      success: true,
    });
  });
  test("Validate creation of correct ad with minimum title and description characters", async () => {
    const body = {
      title: "S",
      description: "U",
      authorId: idTeacher_1,
      classRoomId: idSection_1,
      courseId: idCourse_1,
    };

    const { data } = await PostCreateAnnouncement(body, true);
    const id_anuncio = data.data.id;
    expect(data).toEqual({
      code: 2,
      data: {
        id: id_anuncio,
      },
      message: "SUCCESS",
      success: true,
    });
  });
  test("Validate ad creation with html tags", async () => {
    let var_titulo =
      "😀 Sesión 4: Iniciamos Unidad 3 - Cultura, personas, procesos, estrategia y resultados 😀";
    let var_description =
      "<p>Estimados Alumnos:<br><br>Un gusto saludarlos y me dió gusto su participación en nuestra sesión. Me parecieron muy interesantes todas sus ideas emprendedoras, les auguro tendrán éxito a un corto plazo!!.<br><br>Para nuestra Sesión 4, terminaremos la Unidad 2  y daremos inicio a la unidad 3: Cultura, personas, procesos, estrategia y resultados de acuerdo al Sílabo, al respecto ya se encuentra colgada en la plataforma CANVAS la presentación para su revisión.<br>También recuerden que pueden profundizar sus conocimientos, consultando  los contenidos en la sección Información General y se tiene de base el Libro Administración de la Innovación (k. Ahmed) del cual se han extraído los contenidos expuestos de las presentaciones (ver adjunto al presente).<br>Les hago recuerdo que se tomará el 3er  control de lectura - El Gen Mutante, recuerden será solo para marcar V o F (Virtual en la plataforma CANVAS - Semana 4 - Inicio 8.10pm):<br></p>";

    const body = {
      title: var_titulo,
      description: var_description,
      authorId: idTeacher_1,
      classRoomId: idSection_1,
      courseId: idCourse_1,
    };

    const { data } = await PostCreateAnnouncement(body, true);
    const id_anuncio = data.data.id;
    expect(data).toEqual({
      code: 2,
      data: {
        id: id_anuncio,
      },
      message: "SUCCESS",
      success: true,
    });
  });
});
describe("Return an announcement_GET", () => {
  test("Validate that it returns the data of a registered ad", async () => {
    let results = await SelectAnnouNotSeen();
    const announcementId = results[0].announcement_id;
    const { data } = await GetReturnsAnnouncement(announcementId, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: data.data.id,
        title: data.data.title,
        description: data.data.description,
        authorId: data.data.authorId,
        publishAt: data.data.publishAt,
        courseId:data.data.courseId,
        classRoomId:data.data.classRoomId,
        scheduled: false,
      },
      message: "",
      success: true,
    });

  });
  test("Validate registration in the DB", async () => {
    let results = await SelectAnnouNotSeen();
    const announcementId = results[0].announcement_id;
    const { data} = await GetReturnsAnnouncement(announcementId, true);
    // Validar registro de BD
    let results2 = await SelectAnnouncement(announcementId);
    expect(results2[0].id).toEqual(data.data.id);
    expect(results2[0].description).toEqual(data.data.description);
    expect(results2[0].title).toEqual(data.data.title);
  },8000);
  test("Validate that no data is returned, if a non-existent ad is sent", async () => {
    const announcementId_null = "0a50b221-f853-4913-96ff-b027af988776";
    const { data } = await GetReturnsAnnouncement(
      announcementId_null,
      true
    );
    expect(data).toEqual({
      code: 4,
      data: "announcement not found",
      message: "404",
      success: false,
    });
  });
});
describe("Ads canceled_PUT", () => {
  test("Validate that a created ad can be canceled", async () => {
    let results = await SelectIdAnnou();
    const announIdcreated = results[0].id;
    const body = {
      announcement_id: announIdcreated,
    };
    const { data } = await PutCancelAnnouncement(
      announIdcreated,
      body,
      true
    );
    expect(data).toEqual({
      code: 2,
      data: "ok",
      message: "",
      success: true,
    });

    // Validar registro de BD
    let results2 = await SelectAnnouCancel(announIdcreated);
    expect(results2[0].status).toEqual("cancel");
  },8000);
  test("Validate that a canceled ad can NOT be canceled", async () => {
    const body = {
      announcement_id: idAdCanceled_1,
    };
    const { data } = await PutCancelAnnouncement(
      idAdCanceled_1,
      body,
      true
    );
    expect(data).toEqual({
      code: 4,
      data: "announcement canceled",
      message: "404",
      success: false,
    });
  });
  test("Validate that it returns an error if you cancel a non-existent ad", async () => {
    const announIdcreated = "b53227c2-1b37-4728-a639-21a683d3c528";
    const body = {
      announcement_id: announIdcreated,
    };
    const { data} = await PutCancelAnnouncement(
      announIdcreated,
      body,
      true
    );
    expect(data).toEqual({
      code: 4,
      data: "announcement not found",
      message: "404",
      success: false,
    });
  });
  test("Validate that it returns error if you do not send ad id", async () => {
    const announIdcreated = "";
    const body = {
      announcement_id: announIdcreated,
    };
    const { data } = await PutCancelAnnouncement(
      announIdcreated,
      body,
      false
    );
    expect(data).toEqual({
      error: "Method Not Allowed",
      message: "Request method 'PUT' not supported",
      status: 405,
      path: "/announcement//to-cancel",
      timestamp: data.timestamp,
    });
  });
});
describe("Ad filter_GET", () => {
  test("Validate that it returns a list of published announcements", async () => {
    let results = await SelectAnnouPublish();
    const author_id = results[0].author_id;
    const { data } = await GetFilterAnnouncement(
      author_id,
      1,
        filterPublished,
      true
    );
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("");
    expect(data.success).toEqual(true);
    // Validar registro de BD
    for (let i = 0; i < data.data.length; i++) {
      let item = data.data[i];
      let results2 = await SelectAnnouPublishAuthor(author_id);
      expect(results2[i].description).toEqual(item.description);
      expect(results2[i].id).toEqual(item.id);
      expect(results2[i].title).toEqual(item.title);
    }
  },5000);
  test("Validate that it returns a list of programmed announcements", async () => {
    let results = await SelectAnnouScheduled();
    const author_id = results[0].author_id;
    const { data } = await GetFilterAnnouncement(
      author_id,
      1,
        filterScheduled,
      true
    );
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("");
    expect(data.success).toEqual(true);

    // Validar registro de BD

    for (let i = 0; i < data.data.length; i++) {
      let item = data.data[i];
      let results2 = await SelectAnnouScheduledAuthor(author_id);
      expect(results2[i].description).toEqual(item.description);
      expect(results2[i].id).toEqual(item.id);
      expect(results2[i].title).toEqual(item.title);
    }
  },8000);
});
