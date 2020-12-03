import {
  GetForum,
  PostCreateForum,
  PostPublicForum,
  GetFilterForum,
  GetForumStudent,
  PutChangeReadForum,
  GetForumStudentSearch,
  PostCommentForums,
  GetForumStudentComment,
  GetForumCourses, PostConsultationForum, GetListForumTeacher
} from "../../src/course/services/Forum";
import {
  SelectForumId,
  SelectForumIdSave,
  SelectForumSaved,
  SelectForumPUBLISHED,
  SelectForumPROGRAMMED,
  SelectForumStudent,
  SelectForumNotSeen,
  SelectForumSeen,
  SelectForoNotSeenIdDifferent,
  SelectForumComment,
  SelectForumIdCurrent,
  SelectForumFilterCount,
  SelectForumStr_section_ids
} from "../../src/course/querys/index_Forum";
import {
  idTeacher_1,
  idCourse_1,
  idSection_1,
  forum_content,
  ifForumPublish,
  filterSaved,
  filterPUBLISHED,
  filterPROGRAMMED,
  idAlumno_1,
  idAlumno_2,
  IdAlumno_3,
  idCourse_2,
  IdAlumno_5,
  idSection_4,
  DateandTime,
  Time1m,
  TimeLess1m,
  Time15m,
  Time1d,
  Time8h,
  Time10m,
  Time1s,
  idCourse_5, idSection_5, idSection_7
} from "../../utilities";
import {SelectTotAnnouNotSeen} from "../../src/communication/querys/index_Reader";
import {SelectCalendar} from "../../src/course/querys/index_Calendar";
import dayjs from "dayjs";

describe("Forum GET", () => {
  test("Validate that the detail of the forum is displayed by the id", async () => {
    let results = await SelectForumIdSave();
    const idForum=results[0].id;
    const { data, status } = await GetForum(
        idForum,
        true
    );
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("");
    expect(data.success).toEqual(true);
    for (let i = 0; i < data.data.length; i++) {
      let x = data.data[i];
      expect(x).toEqual({
        id: x.id,
        title: x.title,
        seen:x.seen,
        courseId:x.courseId,
        content:x.content,
        files:x.files,
        authorId:x.authorId,
        finishAt:x.finishAt,
        isEvaluated:x.isEvaluated,
        presentationAt:x.presentationAt,
        publishBefore:x.publishBefore,
        publishAt:x.publishAt,
        status:x.status,
      });
    }
  },50000);
});

describe("Creation of Forum_Borrador_POST", () => {
  test("As a teacher I want to save a forum only with title + section", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      finishAt:"2020-12-30 12:12:12",
    };

    const { data, status } = await PostCreateForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 2,
      data: {
        id: id_forum,
      },
      message: "SUCCESS",
      success: true,
    });

    // Validar registro de BD

    let results2 = await SelectForumId(id_forum);
    expect(results2.title).toEqual(data.data.title);
    expect(results2[0].status).toEqual("SAVED");
    expect(results2[0].section_ids).toEqual([idSection_1]);
  });
  test("As a teacher I want to save a forum only with title + section + content", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      finishAt:"2020-12-30 12:12:12",
    };

    const { data, status } = await PostCreateForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 2,
      data: {
        id: id_forum,
      },
      message: "SUCCESS",
      success: true,
    });

    // Validar registro de BD

    let results2 = await SelectForumId(id_forum);
    expect(results2.title).toEqual(data.data.title);
    expect(results2[0].status).toEqual("SAVED");
    expect(results2[0].section_ids).toEqual([idSection_1]);
    expect(results2[0].content).toEqual(forum_content);
  });
  test("As a teacher I want to save a forum only with title + section + content + file", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      finishAt:"2020-12-30 12:12:12",
    };

    const { data, status } = await PostCreateForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 2,
      data: {
        id: id_forum,
      },
      message: "SUCCESS",
      success: true,
    });
  });
  test("As a teacher I want to save a forum only with title + section + content + file + evaluation (false)", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      finishAt:"2020-12-30 12:12:12",
    };

    const { data, status } = await PostCreateForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 2,
      data: {
        id: id_forum,
      },
      message: "SUCCESS",
      success: true,
    });
  });
  test("As a teacher I want to save a forum only with title + section + content + file + evaluation (true)", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:true,
      finishAt:"2020-12-30 12:12:12",
    };

    const { data, status } = await PostCreateForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 2,
      data: {
        id: id_forum,
      },
      message: "SUCCESS",
      success: true,
    });
  });
  test("As a teacher I want to save a forum only with title + section + content + file + evaluation (true) + Comment (false)", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:true,
      publishBefore:false,
      finishAt:"2020-12-30 12:12:12",
    };

    const { data, status } = await PostCreateForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 2,
      data: {
        id: id_forum,
      },
      message: "SUCCESS",
      success: true,
    });
  });
  test("As a teacher I want to save a forum only with title + section + content + file + evaluation (false) + Comment (true)", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true,
      finishAt:"2020-12-30 12:12:12",
    };

    const { data, status } = await PostCreateForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 2,
      data: {
        id: id_forum,
      },
      message: "SUCCESS",
      success: true,
    });
  });
  test("As a teacher I want to save a forum only with title + section + content + file + evaluation (false) + Comment (true) + Date available forum", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true,
      finishAt:"2020-12-30 12:12:12",
    };

    const { data, status } = await PostCreateForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 2,
      data: {
        id: id_forum,
      },
      message: "SUCCESS",
      success: true,
    });
  });
  test("As a teacher I want to save a forum only with title + section + content + file + evaluation (false) + Comment (true) + Available forum date + Closing date", async () => {
    const body = {
      title: "As a teacher I want to save a forum only with title + section + content + file + evaluation (false) + Comment (true) + Available forum date + Closing date",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true,
      finishAt:"2020-12-30 12:12:12",
    };

    const { data} = await PostCreateForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 2,
      data: {
        id: id_forum,
      },
      message: "SUCCESS",
      success: true,
    });
  });
});

describe("Save de Forum_POST enviando ID", () => {

  test("As a teacher I want to save a forum only with the minimum field", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: results[0].course_id,
      authorId: idTeacher_1,
      publishBefore: true,
      publishAt:"2020-11-03 12:12:12",
      finishAt:"2020-12-30 12:12:12",
    };

    const { data, status } = await PostCreateForum(body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: idForumSave,
      },
      message: "SUCCESS",
      success: true,
    });

    // Validar registro de BD
    let results2 = await SelectForumId(idForumSave);
    expect(results2.title).toEqual(data.data.title);
    expect(results2[0].status).toEqual('SAVED')
  },10000);
  test("As a teacher I want to save a forum only with title + section", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: results[0].course_id,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      finishAt:"2020-12-30 12:12:12",
    };

    const { data } = await PostCreateForum(body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: idForumSave,
      },
      message: "SUCCESS",
      success: true,
    });

    // Validar registro de BD

    let results2 = await SelectForumId(idForumSave);
    expect(results2.title).toEqual(data.data.title);
    expect(results2[0].status).toEqual("SAVED");
    expect(results2[0].section_ids).toEqual([idSection_1]);
  },7000);
  test("As a teacher I want to save a forum only with title + section + content", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: results[0].course_id,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      finishAt:"2020-12-30 12:12:12",
    };

    const { data, status } = await PostCreateForum(body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: idForumSave,
      },
      message: "SUCCESS",
      success: true,
    });

    // Validar registro de BD

    let results2 = await SelectForumId(idForumSave);
    expect(results2.title).toEqual(data.data.title);
    expect(results2[0].status).toEqual("SAVED");
    expect(results2[0].section_ids).toEqual([idSection_1]);
    expect(results2[0].content).toEqual(forum_content);
  },7000);
  test("As a teacher I want to save a forum only with title + section + content + file", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: results[0].course_id,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      finishAt:"2020-12-30 12:12:12",
    };

    const { data, status } = await PostCreateForum(body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: idForumSave,
      },
      message: "SUCCESS",
      success: true,
    });
  });
  test("As a teacher I want to save a forum only with title + section + content + file + evaluation (false)", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: results[0].course_id,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      finishAt:"2020-12-30 12:12:12",
    };

    const { data, status } = await PostCreateForum(body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: idForumSave,
      },
      message: "SUCCESS",
      success: true,
    });
  });
  test("As a teacher I want to save a forum only with title + section + content + file + evaluation (true)", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: results[0].course_id,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:true,
      finishAt:"2020-12-30 12:12:12",
    };

    const { data, status } = await PostCreateForum(body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: idForumSave,
      },
      message: "SUCCESS",
      success: true,
    });
  },6000);
  test("As a teacher I want to save a forum only with title + section + content + file + evaluation (true) + Comment (false)", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: results[0].course_id,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:true,
      publishBefore:false,
      finishAt:"2020-12-30 12:12:12",
    };

    const { data, status } = await PostCreateForum(body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: idForumSave,
      },
      message: "SUCCESS",
      success: true,
    });
  });
  test("As a teacher I want to save a forum only with title + section + content + file + evaluation (false) + Comment (true)", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: results[0].course_id,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true,
      finishAt:"2020-12-30 12:12:12",
    };

    const { data, status } = await PostCreateForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 2,
      data: {
        id: idForumSave,
      },
      message: "SUCCESS",
      success: true,
    });
  });
  test("As a teacher I want to save a forum only with title + section + content + file + evaluation (false) + Comment (true) + Forum start date", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: results[0].course_id,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true,
      publishAt:"2020-12-30 12:12:12",
      finishAt:"2020-12-31 12:12:12",

    };

    const { data, status } = await PostCreateForum(body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: idForumSave,
      },
      message: "SUCCESS",
      success: true,
    },6000);
  });
  test("As a teacher I want to save a forum only with title + section + content + file + evaluation (false) + Comment (true) + Forum start date + End date", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: results[0].course_id,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true,
      publishAt: "2020-06-30 12:12:12",
      finishAt:"2020-06-30 18:12:12",
    };

    const { data} = await PostCreateForum(body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: idForumSave,
      },
      message: "SUCCESS",
      success: true,
    });
  });
  test("As a teacher I can save a forum where the start date is greater than the end date ", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: results[0].course_id,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true,
      publishAt: "2021-06-30 12:12:12",
      finishAt:"2021-07-20 12:12:12",
    };

    const { data, status } = await PostCreateForum(body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: idForumSave,
      },
      message: "SUCCESS",
      success: true,
    });
  });
});

//jest --setupFiles dotenv/config
describe("Validate that saved forums can be published_POST", () => {
  test("Validating that you cannot post a forum with just the title", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1]
    };
    const { data, status } = await PostPublicForum(body, true);
    expect(data).toEqual({
      code: 400000007,
      data: {},
      message: "el contenio es necesario",
      success: false,
    });

  });
  test("Validating that I cannot publish forum title + description", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,

    };
    const { data, status } = await PostPublicForum(body, true);
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "LA fecha finishAt es requerida",
      success: false,
    });

  });
  test("Validating that you can NOT publish forum title + description + Final lower than today", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      finishAt:"2020-06-22 12:12:12",
    };
    const { data, status } = await PostPublicForum(body, true);
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "la fecha finishAt debe ser mayor a la fecha de fecha de publicacion",
      success: false,
    });

  });
  test("Validate that you can post forum: title + description + Final date (1 minute + today)", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      publishAt:DateandTime,
      finishAt:Time1m
    };
    const { data} = await PostPublicForum(body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        ids: [
          data.data.ids[0]
        ]
      },
      message: "SUCCESS",
      success: true,
    });

  });
  test("As a teacher I can NOT publish a forum with only title + section", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1]
    };
    const { data, status } = await PostPublicForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 400000007,
      data: {},
      message: "el contenio es necesario",
      success: false,
    });
  });
  test("As a teacher I can NOT publish a forum with only title + section + content", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content
    };

    const { data, status } = await PostPublicForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "LA fecha finishAt es requerida",
      success: false,
    });

  });
  test("As a teacher I can NOT publish a forum only with title + section + content + file", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf']
    };

    const { data, status } = await PostPublicForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "LA fecha finishAt es requerida",
      success: false,
    });
  });
  test("As a teacher I cannot publish a forum with only title + section + content + file + evaluation (false)", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false
    };

    const { data, status } = await PostPublicForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "LA fecha finishAt es requerida",
      success: false,
    });
  });
  test("As a teacher I cannot publish a forum with only title + section + content + file + evaluation (true)", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:true
    };

    const { data, status } = await PostPublicForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "LA fecha finishAt es requerida",
      success: false,
    });
  },6000);
  test("As a teacher I cannot publish a forum with only title + section + content + file + evaluation (true) + Comment (false)", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:true,
      publishBefore:false
    };

    const { data, status } = await PostPublicForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "LA fecha finishAt es requerida",
      success: false,
    });
  });
  test("As a teacher I cannot publish a forum with only title + section + content + file + evaluation (false) + Comment (true)", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true
    };

    const { data, status } = await PostPublicForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "LA fecha finishAt es requerida",
      success: false,
    });
  },6000);
  // la diferencia de fecha (15m) solo se ha considerado por la parte front
  test.skip("As a teacher I cannot post a forum where the publication date is equal to the end date", async () => {
    console.log(DateandTime)
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true,
      publishAt: DateandTime,
      finishAt:DateandTime,
    };

    const { data, status } = await PostPublicForum(body, true);
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "la fecha finishAt debe ser mayor a la publishAt",
      success: false,
    });
  });
  test("As a teacher, I cannot post a forum if the start date is less than the current date", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true,
      publishAt: TimeLess1m,
      finishAt:Time1m,
    };

    const { data, status } = await PostPublicForum(body, true);
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "la fecha publishAt debe ser mayor a la fecha actual",
      success: false,
    });
  });
  test("As a teacher I CANNOT re-post a published forum", async () => {
    const body = {
      id:ifForumPublish,
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true,
      publishAt: "2020-12-29 12:12:12",
      finishAt:"2020-12-20 12:12:12",
      presentationAt:"2020-12-30 12:11:12",
    };

    const { data, status } = await PostPublicForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "el foro ya está publicado",
      success: false,
    });
  });
  test("Validate that the saved forum is deleted when the id is published with a new id", async () => {
    let results = await SelectForumIdSave(idTeacher_1);
    const idForumSave=results[0].id;
    const body = {
      id:idForumSave,
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      publishAt:DateandTime,
      finishAt:Time1m
    };

    const { data} = await PostPublicForum(body, true);

    const idForum=data.data.ids[0]

    let results2 = await SelectForumId(idForumSave);
    expect(results2[0]).toBeUndefined()
    let results3 = await SelectForumId(idForum);
    expect(results3[0].title).toEqual(".")
  },9000);

});

describe("Created forum publich", () => {
// jest --setupFiles dotenv/config
  test("Validating that you cannot post a forum with just the title", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1]
    };
    const { data, status } = await PostPublicForum(body, true);
    expect(data).toEqual({
      code: 400000007,
      data: {},
      message: "el contenio es necesario",
      success: false,
    });

  });
  test("Validating that I cannot publish forum title + description", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content
    };
    const { data, status } = await PostPublicForum(body, true);
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "LA fecha finishAt es requerida",
      success: false,
    });

  });
  test("As a teacher I can post a forum title + description + Final F. same as today", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      finishAt:Time1d
    };
    const { data} = await PostPublicForum(body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        ids: [
          data.data.ids[0]
        ]
      },
      message: "SUCCESS",
      success: true,
    });

  });
  test("As a teacher I cannot publish a forum: title + description + initial F lower than current", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      publishAt:TimeLess1m,
      finishAt:Time1d,
    };
    const { data} = await PostPublicForum(body, true);
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "la fecha publishAt debe ser mayor a la fecha actual",
      success: false,
    });

  });
  test("As a teacher I can NOT publish a forum with only title + section", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1]
    };
    const { data} = await PostPublicForum(body, true);
    expect(data).toEqual({
      code: 400000007,
      data: {},
      message: "el contenio es necesario",
      success: false,
    });
  });
  test("As a teacher I can NOT publish a forum with only title + section + content", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content
    };

    const { data} = await PostPublicForum(body, true);
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "LA fecha finishAt es requerida",
      success: false,
    });

  });
  test("As a teacher I can NOT publish a forum only with title + section + content + file", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf']
    };

    const { data} = await PostPublicForum(body, true);
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "LA fecha finishAt es requerida",
      success: false,
    });
  });
  test("As a teacher I cannot publish a forum with only title + section + content + file + evaluation (false)", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false
    };

    const { data, status } = await PostPublicForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "LA fecha finishAt es requerida",
      success: false,
    });
  });
  test("As a teacher I cannot publish a forum with only title + section + content + file + evaluation (true)", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:true
    };

    const { data, status } = await PostPublicForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "LA fecha finishAt es requerida",
      success: false,
    });
  });
  test("As a teacher I cannot publish a forum with only title + section + content + file + evaluation (true) + Comment (false)", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:true,
      publishBefore:false
    };

    const { data, status } = await PostPublicForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "LA fecha finishAt es requerida",
      success: false,
    });
  });
  test("As a teacher I cannot publish a forum with only title + section + content + file + evaluation (false) + Comment (true)", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true
    };

    const { data, status } = await PostPublicForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "LA fecha finishAt es requerida",
      success: false,
    });
  });
  test("As a teacher I can NOT publish a forum only with title + section + content + file + evaluation (false) + Comment (true) + Forum available date ", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true,
      publishAt: DateandTime
    };

    const { data, status } = await PostPublicForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "LA fecha finishAt es requerida",
      success: false,
    });
  });
  test("As a teacher I cannot publish a forum if the submission date is less than the current one", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true,
      publishAt: TimeLess1m,
      finishAt:Time8h,
    };

    const { data} = await PostPublicForum(body, true);
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "la fecha publishAt debe ser mayor a la fecha actual",
      success: false,
    });
  });
  // esta validación solo se da por front
  test.skip("As a teacher I cannot post a forum where the publication date is equal to the end date", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true,
      publishAt: DateandTime,
      finishAt:DateandTime,
    };

    const { data, status } = await PostPublicForum(body, true);
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "la fecha finishAt debe ser mayor a la fecha de publicacion",
      success: false,
    });
  });
  test("Validate that the published forum is correctly registered in the DB", async () => {
    const body = {
      title: ".",
      courseId: idCourse_1,
      authorId: idTeacher_1,
      sectionIds:[idSection_1],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true,
      publishAt: DateandTime,
      finishAt:Time1d
    };

    const { data} = await PostPublicForum(body, true);
    const id_forum = data.data.ids[0];
    console.log(id_forum)
    let results2 = await SelectForumId(id_forum);
    expect(results2.title).toEqual(data.data.title);
    expect(results2[0].status).toEqual('PUBLISHED')
  });
  test("Validate that when publishing a forum for two sections, different id is generated", async () => {
    const body = {
      title: ".",
      courseId: idCourse_5,
      authorId: idTeacher_1,
      sectionIds:[idSection_5,idSection_7],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true,
      publishAt: DateandTime,
      finishAt:Time1s
    };

    const { data} = await PostPublicForum(body, true);
    const id_forum = data.data.id;
    expect(data).toEqual({
      code: 2,
      data: {
        ids: [
          data.data.ids[0],
          data.data.ids[1]
        ]
      },
      message: "SUCCESS",
      success: true,
    });
  });
  test("Validate that when publishing a forum for two it is registered in the DB", async () => {
    const body = {
      title: ".",
      courseId: idCourse_5,
      authorId: idTeacher_1,
      sectionIds:[idSection_5,idSection_7],
      content:forum_content,
      files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
      isEvaluated:false,
      publishBefore:true,
      publishAt: DateandTime,
      finishAt:Time1s
    };

    const { data} = await PostPublicForum(body, true);
    let results2 = await SelectForumId(data.data.ids[0]);
    expect(results2.title).toEqual(data.data.title);
    expect(results2[0].status).toEqual('PUBLISHED')
    let results3 = await SelectForumId(data.data.ids[1]);
    expect(results3.title).toEqual(data.data.title);
    expect(results3[0].status).toEqual('PUBLISHED')
  },6000);
});

describe("Filtro de forum", () => {
  test("Validar que devuelva listado de foro SAVED", async () => {
    const { data, status } = await GetFilterForum(
        idCourse_1,
        idSection_1,
        idTeacher_1,
        filterSaved,
        1,
        true
    );
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("");
    expect(data.success).toEqual(true);
    for (let i = 0; i < data.data.length; i++) {
      let x = data.data[i];
      expect(x).toEqual({
          id: x.id,
          title: x.title,
          sectionIds:x.sectionIds,
          courseId:x.courseId,
          content:x.content,
          files:x.files,
          authorId:x.authorId,
          finishAt:x.finishAt,
          isEvaluated:x.isEvaluated,
          presentationAt:x.presentationAt,
          publishBefore:x.publishBefore,
          publishAt:x.publishAt,
          status:x.status
      });
    }
    // Validar registro de BD
    let results2 = await SelectForumSaved(filterSaved,idTeacher_1,idCourse_1,idSection_1);
    for (let i = 0; i < data.data.length; i++) {
      let item = data.data[i];
      expect(results2[i].id).toEqual(item.id);
      expect(results2[i].title).toEqual(item.title);
      expect(results2[i].status).toEqual(item.status);
    }

  },50000);
  test("Validar que devuelva listado de foro PUBLISHED", async () => {
    const { data, status } = await GetFilterForum(
        idCourse_1,
        idSection_1,
        idTeacher_1,
        filterPUBLISHED,
        1,
        true
    );
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("");
    expect(data.success).toEqual(true);
    let results2 = await SelectForumPUBLISHED(filterPUBLISHED,idTeacher_1,idCourse_1,idSection_1);
    // Validar registro de BD
    for (let i = 0; i < data.data.length; i++) {
      let item = data.data[i];
      expect(results2[i].id).toEqual(item.id);
      expect(results2[i].title).toEqual(item.title);
    }

  },50000);
  test.skip("Validar que devuelva listado de foro PROGRAMMED", async () => {
    const { data, status } = await GetFilterForum(
        idCourse_1,
        idSection_1,
        idTeacher_1,
        filterPROGRAMMED,
        1,
        true
    );
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("");
    expect(data.success).toEqual(true);
    let results2 = await SelectForumPROGRAMMED(idTeacher_1,idCourse_1,idSection_1);
    // Validar registro de BD
    for (let i = 0; i < data.data.length; i++) {
      let item = data.data[i];
      expect(results2[i].id).toEqual(item.id);
      expect(results2[i].title).toEqual(item.title);
    }

  },50000);
});

describe("Forum student_GET", () => {
  test("Como alumno deseo ver mis foros publicados por curso", async () => {
    const { data, status } = await GetForumStudent(
        idCourse_1,
        idAlumno_2,
        1,
        true
    );
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("");
    expect(data.success).toEqual(true);
    for (let i = 0; i < data.data.length; i++) {
      let x = data.data[i];
    expect(x).toEqual({
        id: x.id,
        userId: x.userId,
        seen:x.seen,
        sectionId:x.sectionId,
        forumResponse:{
          id:x.forumResponse.id,
          title:x.forumResponse.title,
          sectionIds:x.forumResponse.sectionIds,
          courseId:x.forumResponse.courseId,
          content:x.forumResponse.content,
          files:x.forumResponse.files,
          authorId:x.forumResponse.authorId,
          finishAt:x.forumResponse.finishAt,
          isEvaluated:x.forumResponse.isEvaluated,
          presentationAt:x.forumResponse.presentationAt,
          publishBefore:x.forumResponse.publishBefore,
          publishAt:x.forumResponse.publishAt,
          status:x.forumResponse.status,
        }
    });
    }
    // Validando BD
    let results2 = await SelectForumStudent(idAlumno_2,idCourse_1);
    for (let i = 0; i < data.data.length; i++) {
      let item = data.data[i];
      expect(results2[i].id).toEqual(item.forumResponse.id);
      expect(results2[i].title).toEqual(item.forumResponse.title);
      expect(results2[i].course_id).toEqual(item.forumResponse.courseId);
      expect(results2[i].content).toEqual(item.forumResponse.content);
      expect(results2[i].author_id).toEqual(item.forumResponse.authorId);
      expect(results2[i].status).toEqual(item.forumResponse.status);
    }
  },50000);
  test("El sistema debe validar al enviar idStudent inexistente", async () => {
    const { data, status } = await GetForumStudent(
        idCourse_1,
        "8f63dd3f-6666-5331-95d3-530384HYDe45",
        1,
        true
    );
    expect(data).toEqual({
      code: 400000008,
      data: {},
      message: "El id no es un valor válido",
      success: false,
    });
  });
  test("El sistema NO debe permitir mostrar foros que no sea del estudiante  ", async () => {
    const { data, status } = await GetForumStudent(
        idCourse_1,
        IdAlumno_3,
        1,
        true
    );
    expect(data).toEqual({
      code: 2,
      data: [],
      message: "",
      success: true,
    });
  });
  test("El sistema debe validar que se envie curso id correcto", async () => {
    const { data, status } = await GetForumStudent(
        '086211c7-1323-5407-bfc9-45fc505a4bb9H',
        idAlumno_2,
        1,
        true
    );
    expect(data).toEqual({
      code: 400000008,
      data: {},
      message: "El courseId no es un valor válido",
      success: false,
    });
  });
  test("El sistema muestra vacio si el curso no tiene foro", async () => {
    const { data, status } = await GetForumStudent(
        idCourse_2,
        idAlumno_2,
        1,
        true
    );
    expect(data).toEqual({
      code: 2,
      data: [],
      message: "",
      success: true,
    });
  });
});

describe("Forum student search_GET", () => {
  test("Como alumno deseo realizar busqueda de foro por título", async () => {
    const filter_title='Foro';
    const { data, status } = await GetForumStudentSearch(
        idCourse_1,
        idAlumno_2,
        1,
        filter_title,
        true
    );
    for (let i = 0; i < data.data.length; i++) {
      let x = data.data[i];
      expect(x).toEqual({
        id: x.id,
        userId: x.userId,
        seen:x.seen,
        sectionId:x.sectionId,
        forumResponse:{
          id:x.forumResponse.id,
          title:x.forumResponse.title,
          sectionIds:x.forumResponse.sectionIds,
          courseId:x.forumResponse.courseId,
          content:x.forumResponse.content,
          files:x.forumResponse.files,
          authorId:x.forumResponse.authorId,
          finishAt:x.forumResponse.finishAt,
          isEvaluated:x.forumResponse.isEvaluated,
          presentationAt:x.forumResponse.presentationAt,
          publishBefore:x.forumResponse.publishBefore,
          publishAt:x.forumResponse.publishAt,
          status:x.forumResponse.status,
        }
      });
    }
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("");
    expect(data.success).toEqual(true);
    // Validar registro de BD
    let results2 = await SelectForumFilterCount(filter_title,idCourse_1,idSection_1);
    const x = parseInt(results2[0].total, 10);
    expect(x).toEqual(data.data.length);

  },8000);
});

describe("Cambiar foro a estado leído PUT", () => {
  test("Validar que cambie a estado leído un foro existente", async () => {
    let results = await SelectForumNotSeen();
    const forumReaderId = results[0].id;
    const { data, status } = await PutChangeReadForum(
        idCourse_1,
        idAlumno_2,
        forumReaderId,
        true
    );
    expect(data).toEqual({
      code: 2,
      data: "ok",
      message: "",
      success: true,
    });

    // Validar registro de BD
    let results2 = await SelectForumSeen(forumReaderId);
    expect(results2[0].seen).toEqual(true);
  },8000);
  test.skip("Validar que NO cambie a estado leído un foro que no te pertenece", async () => {
    let results = await SelectForoNotSeenIdDifferent(idAlumno_2);
    const forumReaderId = results[0].id;
    console.log(forumReaderId)
    const { data, status } = await PutChangeReadForum(
        idCourse_1,
        idAlumno_2,
        forumReaderId,
        true
    );
    expect(data).toEqual({
      code: 4,
      data: "no puedes modificar foros de otras personas",
      message: "401",
      success: true,
    });
  });
  test("El sistema no debe permitir cambiar un foro que no existe", async () => {
    const forumReaderId= 'a0cd81d6-9221-45e2-982c-6c5240fac114';
    const { data, status } = await PutChangeReadForum(
        idCourse_1,
        idAlumno_2,
        forumReaderId,
        true
    );
    expect(data).toEqual({
      code: 400080003,
      data: {},
      message: "ForumReader not found",
      success: false,
    });
  });
});

describe("create forum comment_POST", () => {
  test("Scenario: As a student I want to comment on a forum.", async () => {
    let results = await SelectForumIdCurrent(true,filterPUBLISHED,idSection_1,idCourse_1);
    const forumId = results[0].id;
    const body = {
      description: 'Prueba de comentario'
    };
    const { data, status } = await PostCommentForums(idCourse_1,idSection_1,idAlumno_2,forumId,body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: data.data.id,
      },
      message: "SUCCESS",
      success: true,
    });
    let results2 = await SelectForumComment(data.data.id);
    expect(results2[0].description).toEqual('Prueba de comentario');
  });
  test("Scenario: As a student I want to comment on a character.", async () => {
    let results = await SelectForumIdCurrent(true,filterPUBLISHED,idSection_1,idCourse_1);
    const forumId = results[0].id;
    const body = {
      description: 'p'
    };
    const { data, status } = await PostCommentForums(idCourse_1,idSection_1,idAlumno_2,forumId,body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: data.data.id,
      },
      message: "SUCCESS",
      success: true,
    });
    let results2 = await SelectForumComment(data.data.id);
    expect(results2[0].description).toEqual('p');
  });
  test("Scenario: As a student I want to make comments with 100 characters", async () => {
    let results = await SelectForumIdCurrent(true,filterPUBLISHED,idSection_1,idCourse_1);
    const forumId = results[0].id;
    const body = {
      description: 'Ubuntu (pronunciado estilizado como ubuntu) es un sistema operativo de software libre y código abierto'
    };
    const { data, status } = await PostCommentForums(idCourse_1,idSection_1,idAlumno_2,forumId,body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: data.data.id,
      },
      message: "SUCCESS",
      success: true,
    });
    let results2 = await SelectForumComment(data.data.id);
    expect(results2[0].description).toEqual('Ubuntu (pronunciado estilizado como ubuntu) es un sistema operativo de software libre y código abierto');
  },5000);
  test("Scenario: As a student I want to make comments with 1000 characters", async () => {
    let results = await SelectForumIdCurrent(true,filterPUBLISHED,idSection_1,idCourse_1);
    const forumId = results[0].id;
    const body = {
      description: 'Ubuntu (pronunciado estilizado como ubuntu) es un sistema operativo de software libre y código abierto. Es una distribución de Linux basada en Debian. Actualmente corre en computadores de escritorio y servidores. Está orientado al usuario promedio, con un fuerte enfoque en la facilidad de uso y en mejorar la experiencia del usuario. Está compuesto de múltiple software normalmente distribuido bajo una licencia libre o de código abierto. Estadísticas web sugieren que la cuota de mercado de Ubuntu dentro de las distribuciones Linux es, aproximadamente, del 52 %,3​4​ y con una tendencia a aumentar como servidor web.Su patrocinador, Canonical, es una compañía británica propiedad del empresario sudafricano Mark Shuttleworth. Ofrece el sistema de manera gratuita, y se financia por medio de servicios vinculados al sistema operativo 6​7​ y vendiendo soporte técnico.Además, al mantenerlo libre y gratuito, la empresa es capaz de aprovechar los desarrolladores de la comunidad para mejorar los o.'
    };
    const { data, status } = await PostCommentForums(idCourse_1,idSection_1,idAlumno_2,forumId,body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: data.data.id,
      },
      message: "SUCCESS",
      success: true,
    });
    let results2 = await SelectForumComment(data.data.id);
    expect(results2[0].description).toEqual('Ubuntu (pronunciado estilizado como ubuntu) es un sistema operativo de software libre y código abierto. Es una distribución de Linux basada en Debian. Actualmente corre en computadores de escritorio y servidores. Está orientado al usuario promedio, con un fuerte enfoque en la facilidad de uso y en mejorar la experiencia del usuario. Está compuesto de múltiple software normalmente distribuido bajo una licencia libre o de código abierto. Estadísticas web sugieren que la cuota de mercado de Ubuntu dentro de las distribuciones Linux es, aproximadamente, del 52 %,3​4​ y con una tendencia a aumentar como servidor web.Su patrocinador, Canonical, es una compañía británica propiedad del empresario sudafricano Mark Shuttleworth. Ofrece el sistema de manera gratuita, y se financia por medio de servicios vinculados al sistema operativo 6​7​ y vendiendo soporte técnico.Además, al mantenerlo libre y gratuito, la empresa es capaz de aprovechar los desarrolladores de la comunidad para mejorar los o.');
  },8000);
  test.skip("Scenario: As a student I cannot comment on forums that do not belong to me", async () => {
    const idAlumno='8af37c80-87c7-5134-b782-ebb0901a2304';
    let results = await SelectForumIdCurrent(true,filterPUBLISHED,idSection_1,idCourse_1);
    const forumId = results[0].id;
    const body = {
      description: 'As a student I cannot comment on forums that do not belong to me'
    };
    const { data, status } = await PostCommentForums(idCourse_1,idSection_1,idAlumno,forumId,body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: data.data.id,
      },
      message: "SUCCESS",
      success: true,
    });
  });
  test("Scenario: As a teacher I want to comment on my forum.", async () => {
    let results = await SelectForumIdCurrent(true,filterPUBLISHED,idSection_1,idCourse_1);
    const forumId = results[0].id;
    const body = {
      description: 'Prueba de comentario'
    };
    const { data, status } = await PostCommentForums(idCourse_1,idSection_1,idTeacher_1,forumId,body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: data.data.id,
      },
      message: "SUCCESS",
      success: true,
    });
    let results2 = await SelectForumComment(data.data.id);
    expect(results2[0].description).toEqual('Prueba de comentario');
  },8000);
});

describe("create comment of forum comment_POST", () => {
  const parent_ID='a55aeea3-5521-4505-9ff0-ce77c7a4d49b';
  test("Scenario: as a student I can comment on a colleague's comment", async () => {
    let results = await SelectForumIdCurrent(true,filterPUBLISHED,idSection_1,idCourse_1);
    const forumId = results[0].id;
    const body = {
      description: 'Comentario del comentario',
      parentId:parent_ID
    };
    const { data, status } = await PostCommentForums(idCourse_1,idSection_1,idAlumno_2,forumId,body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: data.data.id
      },
      message: "SUCCESS",
      success: true,
    });
    let results2 = await SelectForumComment(data.data.id);
    expect(results2[0].description).toEqual('Comentario del comentario');
    expect(results2[0].parent_id).toEqual(parent_ID);
  },8000);
  test("Scenario: as a student I can create a comment for my comment in the forum", async () => {
    let results = await SelectForumIdCurrent(true,filterPUBLISHED,idSection_1,idCourse_1);
    const forumId = results[0].id;
    const body = {
      description: 'Respondiendo al comentario de mi comentario',
      parentId:parent_ID
    };
    const { data, status } = await PostCommentForums(idCourse_1,idSection_1,IdAlumno_5,forumId,body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: data.data.id
      },
      message: "SUCCESS",
      success: true,
    });
    let results2 = await SelectForumComment(data.data.id);
    expect(results2[0].description).toEqual('Respondiendo al comentario de mi comentario');
    expect(results2[0].parent_id).toEqual(parent_ID);
  },8000);
  test("Scenario: As a student I can post my own comment.", async () => {
    let results = await SelectForumIdCurrent(true,filterPUBLISHED,idSection_1,idCourse_1);
    const forumId = results[0].id;
    const body = {
      description: 'Comentando mi comentario',
      parentId:parent_ID
    };
    const { data, status } = await PostCommentForums(idCourse_1,idSection_1,idAlumno_2,forumId,body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id: data.data.id
      },
      message: "SUCCESS",
      success: true,
    });
    let results2 = await SelectForumComment(data.data.id);
    expect(results2[0].description).toEqual('Comentando mi comentario');
    expect(results2[0].parent_id).toEqual(parent_ID);
  },8000);
});

describe("forum comment listing_GET", () => {
  test("Scenario: as a student I want to see all the comments", async () => {
    let results = await SelectForumIdCurrent(true,filterPUBLISHED,idSection_1,idCourse_1);
    const forumId = results[0].id;
    const { data, status } = await GetForumStudentComment(
        idCourse_1,
        idSection_1,
        '8af37c80-87c7-5134-b782-ebb0901a2304',
        forumId,
        true
    );
    for (let i = 0; i < data.data.length; i++) {
      let x = data.data[i];
      expect(x).toEqual({
        id: x.id,
        userId: x.userId,
        description:x.description,
        forumSectionId:x.forumSectionId,
        forumCourseId:x.forumCourseId,
        forumId:x.forumId,
        createdAt:x.createdAt,
        parentId:x.parentId,
        children:x.children
      });
    }
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("");
    expect(data.success).toEqual(true);
  },50000);
  test.skip("Scenario: As a student I cannot view comments if I have not commented", async () => {
    let results = await SelectForumIdCurrent(false,filterPUBLISHED,idSection_1,idCourse_1);
    const forumId = results[0].id;
    const { data, status } = await GetForumStudentComment(
        idCourse_1,
        idSection_1,
        IdAlumno_3,
        forumId,
        true
    );
    expect(data).toEqual({
      code: 2,
      data: [],
      message: "",
      success: true,
    });
  },50000);
  test("Scenario: As a student I cannot see comments that do not correspond to my course", async () => {
    let results = await SelectForumIdCurrent(true,filterPUBLISHED,idSection_1,idCourse_1);
    const forumId = results[0].id;
    const { data, status } = await GetForumStudentComment(
        idCourse_2,
        idSection_1,
        idAlumno_2,
        forumId,
        true
    );
    expect(data).toEqual({
      code: 2,
      data: [],
      message: "",
      success: true,
    });
  },50000);

});

describe("List forum for the integration of courses", () => {
  test("validate that list forum by sending the idsection", async () => {
    const { data, status } = await GetForumCourses(
        idSection_1,
        true
    );
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("");
    expect(data.success).toEqual(true);
    for (let i = 0; i < data.data.length; i++) {
      let x = data.data[i];
      expect(x).toEqual({
        attachments:x.attachments,
        id: x.id,
        title: x.title,
        isProgrammed: x.isProgrammed,
        description:x.description,
        status:x.status,
        visibleFrom:x.visibleFrom,
        visibleTo:x.visibleTo,
        type:x.type,
        metadata:x.metadata,
      });
    }

  },5000);
  test("Validate forum listing compared to DB", async () => {
    const { data, status } = await GetForumCourses(
        idSection_1,
        true
    );
    // BD

    let results2 = await SelectForumStr_section_ids(idSection_1);
    for (let i = 0; i < results2.length; i++) {
      expect(results2[i].id).toEqual(data.data[i].id)
      expect(results2[i].title).toEqual(data.data[i].title)

    }
  },5000);
  test("Validate not to list forum if section does not exist", async () => {
    const { data, status } = await GetForumCourses(
        '71ff2d1f-264b-5c0b-b9d9-fa54855baca6',
        true
    );
    expect(data).toEqual({
      code: 2,
      data: [],
      message: "",
      success: true,
    });

  });
});


describe("create consultation forum_POST",()=>{
  test("Validate creation of query forum correctly",async ()=>{
    const body={
      sectionId: idSection_1,
      courseId: idCourse_1,
      authorId:idTeacher_1,
      publishAt: "2021-01-04 12:12:12",
      finishAt: "2021-12-04 12:12:12"
    };
    const { data} = await PostConsultationForum(body, true);
    const id_foro=data.data.id
    expect(data).toEqual({
      code: 2,
      data: {
        id:data.data.id
      },
      message: "SUCCESS",
      success: true,
    });
    let results2 = await SelectForumId(id_foro);
    expect(results2[0].title).toEqual("Foro de consulta");
    expect(results2[0].status).toEqual('ASSOCIATED');
    expect(results2[0].is_consultation).toEqual(true);
  },6000)
  test("Validate that it does not register consultation forum but sectionId is sent",async ()=>{
    const body={
      //sectionId: idSection_1,
      courseId: idCourse_1,
      authorId:idTeacher_1,
      publishAt: "2021-01-04 12:12:12",
      finishAt: "2021-12-04 12:12:12"
    };
    const { data} = await PostConsultationForum(body, true);
    expect(data).toEqual({
      code: 400000006,
      data: {},
      message: "El sectionId es requerido",
      success: false,
    });
  })
  test("Validate that consultation forum is NOT registered if empty sectionId is sent.",async ()=>{
    const body={
      sectionId: "",
      courseId: idCourse_1,
      authorId:idTeacher_1,
      publishAt: "2021-01-04 12:12:12",
      finishAt: "2021-12-04 12:12:12"
    };
    const { data} = await PostConsultationForum(body, true);
    expect(data).toEqual({
      code: 400000008,
      data: {},
      message: "El sectionId no es un valor válido",
      success: false,
    });
  })
  test("Validate that it does not register consultation forum but courseId is sent",async ()=>{
    const body={
      sectionId: idSection_1,
      //courseId: idCourse_1,
      authorId:idTeacher_1,
      publishAt: "2021-01-04 12:12:12",
      finishAt: "2021-12-04 12:12:12"
    };
    const { data} = await PostConsultationForum(body, true);
    expect(data).toEqual({
      code: 400000006,
      data: {},
      message: "El courseId no puede ser nulo",
      success: false,
    });
  })
  test("Validate that consultation forum is NOT registered if empty courseId is sent.",async ()=>{
    const body={
      sectionId: idSection_1,
      courseId: "",
      authorId:idTeacher_1,
      publishAt: "2021-01-04 12:12:12",
      finishAt: "2021-12-04 12:12:12"
    };
    const { data} = await PostConsultationForum(body, true);
    expect(data).toEqual({
      code: 400000008,
      data: {},
      message: "El courseId no es un valor válido",
      success: false,
    });
  })
  test("Validate that it does not register consultation forum but publishAt is sent",async ()=>{
    const body={
      sectionId: idSection_1,
      courseId: idCourse_1,
      authorId:idTeacher_1,
      //publishAt: "2021-01-04 12:12:12",
      finishAt: "2021-12-04 12:12:12"
    };
    const { data} = await PostConsultationForum(body, true);
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "la fecha publishAt es obligatoria",
      success: false,
    });
  })
  test("Validate that the query forum is not created by submitting an empty start date",async ()=>{
    const body={
      sectionId: idSection_1,
      courseId: idCourse_1,
      authorId:idTeacher_1,
      publishAt: "",
      finishAt: "2021-12-04 12:12:12"
    };
    const { data} = await PostConsultationForum(body, true);
    expect(data).toEqual({
      code: 400000008,
      data: {},
      message: "publishAt invalid Vo value",
      success: false,
    });
  })
  test("Validate that it does not register consultation forum but finishAt is sent",async ()=>{
    const body={
      sectionId: idSection_1,
      courseId: idCourse_1,
      authorId:idTeacher_1,
      publishAt: "2021-01-04 12:12:12",
      //finishAt: "2021-12-04 12:12:12"
    };
    const { data} = await PostConsultationForum(body, true);
    expect(data).toEqual({
      code: 400080002,
      data: {},
      message: "la fecha finishAt es obligatoria",
      success: false,
    });
  })
  test("Validate that the query forum is not created by submitting an empty end date",async ()=>{
    const body={
      sectionId: idSection_1,
      courseId: idCourse_1,
      authorId:idTeacher_1,
      publishAt: "2021-01-04 12:12:12",
      finishAt: ""
    };
    const { data} = await PostConsultationForum(body, true);
    expect(data).toEqual({
      code: 400000008,
      data: {},
      message: "FinishAt invalid Vo value",
      success: false,
    });
  })
  test("Validate that the consultation forum is registered if not authorId is sent",async ()=>{
    const body={
      sectionId: idSection_1,
      courseId: idCourse_1,
     authorId:idTeacher_1,
      publishAt: "2021-01-04 12:12:12",
      finishAt: "2021-12-04 12:12:12"
    };
    const { data} = await PostConsultationForum(body, true);
    expect(data).toEqual({
      code: 2,
      data: {
        id:data.data.id
      },
      message: "SUCCESS",
      success: true,
    });
  })
  test("Validate that consultation forum is NOT registered if empty authorId is sent.",async ()=>{
    const body={
      sectionId: idSection_1,
      courseId: idCourse_1,
      authorId:"",
      publishAt: "2021-01-04 12:12:12",
      finishAt: "2021-12-04 12:12:12"
    };
    const { data} = await PostConsultationForum(body, true);
    expect(data).toEqual({
      code: 400000008,
      data: {},
      message: "El authorId no es un valor válido",
      success: false,
    });
  })
})

describe("List forum teacher_GET",()=>{
  test("Validate list of teacher  consultation forums",async ()=>{
    const {data}=await GetListForumTeacher(
        idCourse_1,
        idSection_1,
        idTeacher_1,
        true
    )
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("");
    expect(data.success).toEqual(true);

    for (let i = 0; i < data.data.length; i++) {
      let x = data.data[i];
      expect(x).toEqual({
        id: x.id,
        title: x.title,
        sectionIds: x.sectionIds,
        courseId:x.courseId,
        content:x.content,
        files:x.files,
        authorId:x.authorId,
        finishAt:x.finishAt,
        isEvaluated:x.isEvaluated,
        publishBefore:x.publishBefore,
        publishAt:x.publishAt,
        status:x.status,
        isProgrammed:x.isProgrammed,
        isConsultation:x.isConsultation,
      });
    }
  })
  test("Validate list of teacher  consultation forums BD",async ()=>{
    const {data}=await GetListForumTeacher(
        idCourse_1,
        idSection_1,
        idTeacher_1,
        true
    )
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("");
    expect(data.success).toEqual(true);
    let results2 = await SelectForumId(data.data[0].id);
    expect(results2[0].title).toEqual("Foro de consulta");
    expect(results2[0].is_consultation).toEqual(true);
  })
})

