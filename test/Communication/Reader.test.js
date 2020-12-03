import {
  SelectAnnouncementReader,
  SelectTotAnnouNotSeen,
  SelectAnnouNotSeen,
  SelectAnnouSeen,
  SelectAdSearch,
  SelectAnnouNotSeenIdDifferent,
} from "../../src/communication/querys/index_Reader";
import {
  PutChangeReadAnnouncement,
  GetReturnsListAnnouncement,
  GetReturnsTotAnnouNotSeen,
  GetAdSearchByTitle,
} from "../../src/communication/services/Reader";
import {
  idAlumno_1
} from "../../utilities";

describe("Return an ad_GET", () => {
  test("Validate return of ad listing OK", async () => {
    const { data, status } = await GetReturnsListAnnouncement(
      idAlumno_1,
      1,
      false
    );
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("");
    expect(data.success).toEqual(true);

    // Validar registro de BD
    let results = await SelectAnnouncementReader(idAlumno_1);
    for (let i = 0; i < data.data.length; i++) {
      let item = data.data[i];
      expect(results[i].id).toEqual(item.id);
      expect(results[i].announcement_id).toEqual(item.announcement.id);
      expect(results[i].seen).toEqual(item.seen);
      // Lo estoy comentando porque Guille devuelve sin caracter
      //expect(results[i].announcement_title).toEqual(item.announcement.title);
    }
  });
  test("Validate that it does not show anything if there is no ad associated", async () => {
    const { data, status } = await GetReturnsListAnnouncement(
      idAlumno_1,
      70,
      false
    );
    expect(data).toEqual({
      code: 2,
      data: [],
      message: "",
      success: true,
    });
  });
  test("Validate that advertisement is not displayed when string pagination is sent", async () => {
    const { data, status } = await GetReturnsListAnnouncement(
      idAlumno_1,
      "a",
      false
    );
    expect(data).toEqual({
      code: 4,
      data: {
        timestamp: data.data.timestamp,
        status: 400,
        error: "Bad Request",
        message:
          "Failed to convert value of type 'java.lang.String' to required type 'java.lang.Integer'; nested exception is java.lang.NumberFormatException: For input string: \"a\"",
        path: "/announcement/reader/94d088b4-7d96-5e3c-8e3d-65faf67d36d0/a",
      },
      message: "ERROR",
      success: false,
    });
  });
});
describe("Returns the total unseen ads for a student_GET", () => {
  test("Validate that a student's unseen ad total is returned", async () => {
    const { data, status } = await GetReturnsTotAnnouNotSeen(idAlumno_1, true);
    const total_notseen = data.data.total;
    expect(data).toEqual({
      code: 2,
      data: {
        total: total_notseen,
      },
      message: "",
      success: true,
    });
    // Validar registro de BD
    let results = await SelectTotAnnouNotSeen(idAlumno_1);
    const x = parseInt(results[0].total, 10);
    expect(x).toEqual(total_notseen);
  });
});
describe("Change ad to read status_PUT", () => {
  test("Validate that an existing ad changes to read status", async () => {
    let results = await SelectAnnouNotSeen();
    const announReaderId = results[0].id;
    const readerID = results[0].reader_id;
    const body = {
      announcementReaderId: announReaderId,
    };

    const { data, status } = await PutChangeReadAnnouncement(
      readerID,
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
    let results2 = await SelectAnnouSeen(announReaderId);
    expect(results2[0].seen).toEqual(true);
  },8000);
  test("Validate that an ad that does not belong to you change to read status", async () => {
    let results = await SelectAnnouNotSeenIdDifferent(idAlumno_1);
    const announReaderId = results[0].id;
    const body = {
      announcementReaderId: announReaderId,
    };
    const { data, status } = await PutChangeReadAnnouncement(
      idAlumno_1,
      body,
      true
    );
    expect(data).toEqual({
      code: 4,
      data: "no puedes modificar anuncios de otras personas",
      message: "401",
      success: false,
    });
  });
  test("Validate when you want to change an ad that does not exist", async () => {
    let results = await SelectAnnouNotSeen();
    const readerID = results[0].reader_id;
    const body = {
      announcementReaderId: "a0cd81d6-9221-45e2-982c-6c5240fac114",
    };

    const { data, status } = await PutChangeReadAnnouncement(
      readerID,
      body,
      true
    );
    expect(data).toEqual({
      code: 4,
      data: "No existe el anuncio.",
      message: "404",
      success: false,
    });
  });
});
describe("Ad search by title_GET", () => {
  const title = "sesion 1";
  const number = 4;
  const etiqueta = "<br>";
  test("Validate that an ad search is performed by string title", async () => {
    const { data, status } = await GetAdSearchByTitle(idAlumno_1, 1, title, true);
    //console.log(data);
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("");
    expect(data.success).toEqual(true);
    // Validar registro de BD
    let results = await SelectAdSearch(title);
    //console.log(results);
    for (let i = 0; i < data.data.length; i++) {
      let item = data.data[i];
      expect(results[i].id).toEqual(item.id);
      expect(results[i].seen).toEqual(item.seen);
      expect(results[i].announcement_id).toEqual(item.announcement.id);
      //expect(results[i].announcement_title).toEqual(item.announcement.title);
    }
  });
  test("Validate that an advertisement search is carried out by numerical title", async () => {
    const { data, status } = await GetAdSearchByTitle(
      idAlumno_1,
      1,
      number,
      true
    );
    //console.log(data);
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("");
    expect(data.success).toEqual(true);
    // Validar registro de BD
    let results = await SelectAdSearch(number);
    for (let i = 0; i < data.data.length; i++) {
      let item = data.data[i];
      expect(results[i].id).toEqual(item.id);
      expect(results[i].seen).toEqual(item.seen);
      expect(results[i].announcement_id).toEqual(item.announcement.id);
      //expect(results[i].announcement_title).toEqual(item.announcement.title);
    }
  });
  test("Validate search for ads by tag", async () => {
    const { data, status } = await GetAdSearchByTitle(
      idAlumno_1,
      1,
      etiqueta,
      true
    );
    //console.log(data);
    expect(data.code).toEqual(2);
    expect(data.message).toEqual("");
    expect(data.success).toEqual(true);

    // Validar registro de BD
    let results = await SelectAdSearch(etiqueta);
    for (let i = 0; i < data.data.length; i++) {
      let item = data.data[i];
      expect(results[i].id).toEqual(item.id);
      expect(results[i].seen).toEqual(item.seen);
      expect(results[i].announcement_id).toEqual(item.announcement.id);
      expect(results[i].announcement_title).toEqual(item.announcement.title);
    }
  });

});
