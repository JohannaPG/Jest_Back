import {
    PostCreateForum,
    PostPublicForum,
} from "../../src/course/services/Forum";
import {SelectCalendar, SelectCalendarDate, SelectPendingCalendar} from "../../src/course/querys/index_Calendar";
import {
    forum_content,
    idCourse_1,
    idSection_1,
    idTeacher_1,
    idAlumno_2,
    idAlumno_1,
    IdAlumno_4,
    IdAlumno_3
} from "../../utilities";

import {GetCalendar, GetPendingCalendar} from "../../src/course/services/Calendar";
import {SelectForumIdSave} from "../../src/course/querys/index_Forum";

describe("Calendar_Forum", () => {
    test("Scenario: As a student I want to see my forums in the calendar", async () => {
        const body = {
            title: "Foro para el calendario",
            courseId: idCourse_1,
            authorId: idTeacher_1,
            sectionIds:[idSection_1],
            content:forum_content,
            files:['Calendario.pdf'],
            isEvaluated:false,
            publishBefore:true,
            publishAt: "2021-06-30 12:12:12",
            finishAt:"2021-07-20 12:12:12",
            presentationAt:"2021-07-20 12:12:12",
        };
        const { data, status } = await PostPublicForum(body, true);
        let results2 = await SelectCalendar(data.data.id);
        for (let i = 0; i < results2.length; i++) {
            expect(results2[0].title).toEqual('Foro para el calendario')
            expect(results2[0].section_id).toEqual(idSection_1)
            expect(results2[0].status).toEqual('CREATED')
            expect(results2[0].type).toEqual('forum')
            expect(results2[0].course_id).toEqual(idCourse_1)
        }
    },6000);
    test("Scenario: As a student I cannot see saved forum in my calendar", async () => {
        const body = {
            title: "Este foro no se debe visualizar en el calendar",
            courseId: idCourse_1,
            authorId: idTeacher_1,
            sectionIds:[idSection_1],
            content:forum_content
        };
        const { data, status } = await PostCreateForum(body, true);
        let results2 = await SelectCalendar(data.data.id);
        expect(results2[0]).toBeUndefined();
    },6000);
    test("Scenario: as a student I can see a forum on my calendar that was saved but was published", async () => {
        let results = await SelectForumIdSave();
        const idForumSave=results[0].id;
        const body = {
            id:idForumSave,
            title: "Foro para el calendario",
            courseId: idCourse_1,
            authorId: idTeacher_1,
            sectionIds:[idSection_1],
            content:forum_content,
            files:['Las_Diez_caras_de_la_Innovacion_El_Experimentador.pdf'],
            isEvaluated:false,
            publishBefore:true,
            publishAt: "2021-06-30 12:12:12",
            finishAt:"2021-07-20 12:12:12",
            presentationAt:"2021-07-20 12:12:12",
        };
        const { data, status } = await PostPublicForum(body, true);
        expect(data).toEqual({
            code: 2,
            data: {
                id: idForumSave,
            },
            message: "SUCCESS",
            success: true,
        });
        let results2 = await SelectCalendar(idForumSave);
        for (let i = 0; i < results2.length; i++) {
            expect(results2[0].title).toEqual('Foro para el calendario')
            expect(results2[0].section_id).toEqual(idSection_1)
            expect(results2[0].status).toEqual('CREATED')
            expect(results2[0].type).toEqual('forum')
            expect(results2[0].course_id).toEqual(idCourse_1)
        }
    },6000);

});

describe("List Calendar Student GET", () => {
    test("scenario: As a student I want to see my calendar for the whole month of July", async () => {
        const Inicio="2020-07-01 12:12:12";
        const Final= "2020-07-31 12:12:12";
        const { data, status } = await GetCalendar(
            IdAlumno_4,
            Inicio,
            Final,
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
                sectionId:x.sectionId,
                courseId:x.courseId,
                eventId:x.eventId,
                authorId:x.authorId,
                finishAt:x.finishAt,
                startAt:x.startAt,
                type:x.type,
                status:x.status,
                isEvaluated:x.isEvaluated
            });
        }

        // Validar registro de BD
        let results = await SelectCalendarDate(IdAlumno_4,Inicio,Final);
        for (let i = 0; i < results.length; i++) {
            let item = data.data[i];
            expect(results[i].id).toEqual(item.id);
            expect(results[i].title).toEqual(item.title);
            expect(results[i].section_id).toEqual(item.sectionId);
            expect(results[i].course_id).toEqual(item.courseId);
            expect(results[i].author_id).toEqual(item.authorId);
        }
    },50000);
    test("Scenario: The system should not send any listing if the user does not have a forum", async () => {
        const Inicio="2020-07-01 12:12:12";
        const Final= "2020-07-31 12:12:12";
        const { data, status } = await GetCalendar(
            '8f63dd3f-b8da-5331-95d3-530384ff5e46',
            Inicio,
            Final,
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

describe("Calendar pending list Student GET", () => {
    test("scenario: As a student pending List ", async () => {
        const { data, status } = await GetPendingCalendar(
            IdAlumno_4,
            true
        );
        console.log(data.data);
        expect(data.code).toEqual(2);
        expect(data.message).toEqual("");
        expect(data.success).toEqual(true);
        for (let i = 0; i < data.data.length; i++) {
            let x = data.data[i];
            expect(x).toEqual({
                id: x.id,
                title: x.title,
                sectionId:x.sectionId,
                courseId:x.courseId,
                authorId:x.authorId,
                finishAt:x.finishAt,
                startAt:x.startAt,
                type:x.type,
                status:x.status,
                eventId:x.eventId,
                isEvaluated:x.isEvaluated
            });
        }

        // Validar registro de BD
        let results = await SelectPendingCalendar(IdAlumno_4);
        for (let i = 0; i < results.length; i++) {
            let item = data.data[i];
            expect(results[i].id).toEqual(item.id);
            expect(results[i].title).toEqual(item.title);
            expect(results[i].section_id).toEqual(item.sectionId);
            expect(results[i].course_id).toEqual(item.courseId);
            expect(results[i].author_id).toEqual(item.authorId);
        }
    },50000);
    test("Scenario: The system should not send anything but has pending", async () => {
        const { data, status } = await GetPendingCalendar(
            IdAlumno_3,
            true
        );
        expect(data.code).toEqual(2);
        expect(data.message).toEqual("");
        expect(data.success).toEqual(true);

        // Validar registro de BD
        let results = await SelectPendingCalendar(IdAlumno_3);
        for (let i = 0; i < results.length; i++) {
            let item = data.data[i];
            expect(results[i].id).toEqual(item.id);
            expect(results[i].title).toEqual(item.title);
            expect(results[i].section_id).toEqual(item.sectionId);
            expect(results[i].course_id).toEqual(item.courseId);
            expect(results[i].author_id).toEqual(item.authorId);
        }
    },50000);
});
