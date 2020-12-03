import {
    GetChangeStatusNotification,
    GetReturnsListCNotifications, PatchSwitchToSeen
} from "../../src/communication/services/Notifications";
import {idAlumno_2, IdAlumno_3, IdAlumno_4, idTeacher_1} from "../../utilities";
import {
    SelectLastNotification,
    SelectNotifications,
    SelectNotificationsNotSeen,
    SelectNotificationsSeen
} from "../../src/communication/querys/index_Notifications";
import {PostCreateMessage} from "../../src/communication/services/Message";

describe("List of notifications_GET",()=>{
    test("As a student I want to see all my notifications",async ()=>{
        const {data}=await GetReturnsListCNotifications(idAlumno_2,true);
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
                userId:x.userId,
                finishAt:x.finishAt,
                startAt:x.startAt,
                status:x.status,
                resourceType:x.resourceType,
                resourceId:x.resourceId,
                isEvaluated:x.isEvaluated,
                isNotified:x.isNotified,
                seen:x.seen,
            });
        }
        let results = await SelectNotifications(idAlumno_2);
        for (let i = 0; i < data.data.length; i++) {
            let item = data.data[i];
            expect(results[i].id).toEqual(item.id);
            expect(results[i].title).toEqual(item.title);
            expect(results[i].section_id).toEqual(item.sectionId);
            expect(results[i].course_id).toEqual(item.courseId);
            expect(results[i].status).toEqual(item.status);
            expect(results[i].resource_type).toEqual(item.resourceType);
            expect(results[i].resource_id).toEqual(item.resourceId);
            expect(results[i].is_notified).toEqual(item.isNotified);
            expect(results[i].seen).toEqual(item.seen);
        }
    })
    test("As a teacher I want to see all my notifications",async ()=>{
        const {data}=await GetReturnsListCNotifications(idTeacher_1,true);
        expect(data.code).toEqual(2);
        expect(data.message).toEqual("");
        expect(data.success).toEqual(true);
        console.log(data.data);
        for (let i = 0; i < data.data.length; i++) {
            let x = data.data[i];
            expect(x).toEqual({
                id: x.id,
                title: x.title,
                sectionId:x.sectionId,
                courseId:x.courseId,
                userId:x.userId,
                finishAt:x.finishAt,
                startAt:x.startAt,
                status:x.status,
                resourceType:x.resourceType,
                resourceId:x.resourceId,
                isEvaluated:x.isEvaluated,
                isNotified:x.isNotified,
                seen:x.seen,
            });
        }
        let results = await SelectNotifications(idTeacher_1);
        for (let i = 0; i < data.data.length; i++) {
            let item = data.data[i];
            expect(results[i].id).toEqual(item.id);
            expect(results[i].title).toEqual(item.title);
            expect(results[i].section_id).toEqual(item.sectionId);
            expect(results[i].course_id).toEqual(item.courseId);
            expect(results[i].status).toEqual(item.status);
            expect(results[i].resource_type).toEqual(item.resourceType);
            expect(results[i].resource_id).toEqual(item.resourceId);
            expect(results[i].is_notified).toEqual(item.isNotified);
            expect(results[i].seen).toEqual(item.seen);
        }
    })
});

describe("Ads scheduled as new notification_GET",()=>{
    test("The system must allow sending notifications when the announcement is no longer scheduled",async ()=>{
        const {data}=await GetChangeStatusNotification(true);
        console.log(data.data);
        expect(data).toEqual({
            code: 2,
            data: "ok",
            message: "",
            success: true,
        });
    });
    })

describe("Place a notification in seen",()=>{
    test("As a student when viewing a notification, it must change to seen",async ()=>{
    let result= await SelectNotificationsNotSeen();
    const id_notification=result[0].id;
        const{data}=await PatchSwitchToSeen(id_notification,true);
        expect(data).toEqual({
            code: 2,
            data: "ok",
            message: "",
            success: true,
        });
        let result2=await SelectNotificationsSeen(id_notification)
        expect(result2[0].seen).toEqual(true);
    },8000)
});

describe("message notification",()=>{
    test("as a student I want to receive notification from my classmates",async ()=>{
        const body = {
            "message": "Mensaje de alumno Cielo a alumno Geo"
        };
        await PostCreateMessage(IdAlumno_4,idAlumno_2,body, true);
        let result= await SelectLastNotification();
        const id_notification=result[0].id;

        let result2=await SelectNotificationsSeen(id_notification)
        expect(result2[0].resource_type).toEqual("message");
        expect(result2[0].seen).toEqual(false);
        expect(result2[0].title).toEqual("Tu compañer@ Cielo Guerra Torres, te ha enviado un mensaje");
    },9000)
    test("as a student I want to receive notification from my teacher",async ()=>{
        const body = {
            "message": "Mensaje de docente  a alumno Geo"
        };
        await PostCreateMessage(idTeacher_1,idAlumno_2,body, true);
        let result= await SelectLastNotification();
        const id_notification=result[0].id;

        let result2=await SelectNotificationsSeen(id_notification)
        expect(result2[0].resource_type).toEqual("message");
        expect(result2[0].seen).toEqual(false);
        expect(result2[0].title).toEqual("Tu docente Johanna Ortega Gamarra, te ha enviado un mensaje");
    },9000)
    test("as a teacher I want to receive notification from my student",async ()=>{
        const body = {
            "message": "Mensaje de docente  a alumno Geo"
        };
        await PostCreateMessage(idAlumno_2,idTeacher_1,body, true);
        let result= await SelectLastNotification();
        const id_notification=result[0].id;

        let result2=await SelectNotificationsSeen(id_notification)
        expect(result2[0].resource_type).toEqual("message");
        expect(result2[0].seen).toEqual(false);
        expect(result2[0].title).toEqual("Tu alumn@ Geo Guevarra Ortiz, te ha enviado un mensaje");
    },9000)
});