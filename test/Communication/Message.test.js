import {
    idTeacher_1,
    idTeacher_2,
    IdAlumno_4,
    idAlumno_2,
    IdAlumno_3,
    idAlumno_SinData,
    idTeacher_SinData,
} from "../../utilities";
import {
    GetFilterMessage,
    GetListTotalUnreadMessages, GetReturnsConversations,
    GetReturnsListConversations, PatchResetCounter,
    PostCreateMessage
} from "../../src/communication/services/Message";
import {
    SelectFilterRead,
    SelectFilterUnread,
    SelectListConversations,
    SelectListUnreadMessages
} from "../../src/communication/querys/index_Message";

describe("Generate chat message_POST", () => {
    const hoy=new Date();
    test("Validate message creation from teacher to student", async () => {
        const body = {
            "message": "Prueba para la demo  " + hoy
        };
        const { data, status } = await PostCreateMessage(idTeacher_1,IdAlumno_4,body, true);
        expect(data).toEqual({
            code: 2,
            data: {
                id: data.data.id,
            },
            message: "SUCCESS",
            success: true,
        });

    });
    test("Validate message creation from teacher to teacher", async () => {
        const body = {
            "message": "Mensaje de profesor a profesor " + hoy
        };
        const { data, status } = await PostCreateMessage(idTeacher_2,idTeacher_1,body, true);
        expect(data).toEqual({
            code: 2,
            data: {
                id: data.data.id,
            },
            message: "SUCCESS",
            success: true,
        });

    });
    test("Validate message creation from student to student", async () => {
        const body = {
            "message": "Validar mensaje de alumno a alumno " + hoy
        };
        const { data, status } = await PostCreateMessage(IdAlumno_3,IdAlumno_4,body, true);
        expect(data).toEqual({
            code: 2,
            data: {
                id: data.data.id,
            },
            message: "SUCCESS",
            success: true,
        });

    });
    test("Validate message creation from student to teacher", async () => {
        const body = {
            "message": "DEMO _ Creando mensaje de estudiante a teacher " + hoy
        };
        const { data, status } = await PostCreateMessage(IdAlumno_4,idTeacher_1,body, true);
        expect(data).toEqual({
            code: 2,
            data: {
                id: data.data.id,
            },
            message: "SUCCESS",
            success: true,
        });

    });
});
describe("Return list of conversations_GET", () => {
    test("Validate return list of the last chat message teacher", async () => {
        const { data, status } = await GetReturnsListConversations(idTeacher_1, true);
        expect(data.code).toEqual(2);
        expect(data.message).toEqual("");
        expect(data.success).toEqual(true);
        console.log(data)
        for (let i = 0; i < data.data.length; i++) {
            let x = data.data[i];
            expect(x).toEqual({
                id: x.id,
                userIdFrom: x.userIdFrom,
                userIdTo:x.userIdTo,
                lastReceivedAt:x.lastReceivedAt,
                countUnread:x.countUnread,
                lastMessage:x.lastMessage
            });
        }

        let results = await SelectListConversations(idTeacher_1);
        for (let i = 0; i < results.length; i++) {
            let item = data.data[i];
            expect(results[i].id).toEqual(item.id);
            expect(results[i].user_id_from).toEqual(item.userIdFrom);
            expect(results[i].user_id_to).toEqual(item.userIdTo);
            expect(results[i].count_unread).toEqual(item.countUnread);
            expect(results[i].last).toEqual(item.lastMessage);
        }
    });
    test("Validate return list of the last chat message student", async () => {
        const { data, status } = await GetReturnsListConversations(IdAlumno_4, true);
        expect(data.code).toEqual(2);
        expect(data.message).toEqual("");
        expect(data.success).toEqual(true);
        for (let i = 0; i < data.data.length; i++) {
            let x = data.data[i];
            expect(x).toEqual({
                id: x.id,
                userIdFrom: x.userIdFrom,
                userIdTo:x.userIdTo,
                lastReceivedAt:x.lastReceivedAt,
                countUnread:x.countUnread,
                lastMessage:x.lastMessage
            });
        }

        let results = await SelectListConversations(IdAlumno_4);
        for (let i = 0; i < results.length; i++) {
            let item = data.data[i];
            expect(results[i].id).toEqual(item.id);
            expect(results[i].user_id_from).toEqual(item.userIdFrom);
            expect(results[i].user_id_to).toEqual(item.userIdTo);
            expect(results[i].count_unread).toEqual(item.countUnread);
            expect(results[i].last).toEqual(item.lastMessage);
        }
    });
});
describe("List total unread messages_GET", () => {
    test("Validate return list of unread messages teacher", async () => {
        const { data, status } = await GetListTotalUnreadMessages(idTeacher_1, true);
        expect(data).toEqual({
            code: 2,
            data: {
                count: data.data.count
            },
            message: "",
            success: true,
        });
        let results = await SelectListUnreadMessages(idTeacher_1);
        const total = parseInt(results[0].total, 10);
        expect(total).toEqual(data.data.count);
    });
    test("Validate return list of unread messages student", async () => {
        const { data, status } = await GetListTotalUnreadMessages(IdAlumno_4, true);
        expect(data).toEqual({
            code: 2,
            data: {
                count: data.data.count
            },
            message: "",
            success: true,
        });

        let results = await SelectListUnreadMessages(IdAlumno_4);
        const total = parseInt(results[0].total, 10);
        expect(total).toEqual(data.data.count);
    });
});
describe("Reset the counter of a conversation_PATCH", () => {
    test("Validate return list of unread messages teacher", async () => {
        const { data, status } = await PatchResetCounter(idTeacher_1,IdAlumno_4, true);
        expect(data).toEqual({
            code: 2,
            data: {
                count: data.data.count
            },
            message: "",
            success: true,
        });

        let results = await SelectListUnreadMessages(idTeacher_1);
        const total = parseInt(results[0].total, 10);
        console.log(total)
        expect(total).toEqual(data.data.count);
    });
    test("Validate return list of unread messages student", async () => {
        const { data, status } = await PatchResetCounter(IdAlumno_4,idTeacher_1, true);
        expect(data).toEqual({
            code: 2,
            data: {
                count: data.data.count
            },
            message: "",
            success: true,
        });

        let results = await SelectListUnreadMessages(IdAlumno_4);
        const total = parseInt(results[0].total, 10);
        expect(total).toEqual(data.data.count);
    });
});
describe("Filter message_GET", () => {
    test("Validate that it returns unread messages", async () => {
        const { data, status } = await GetFilterMessage(idTeacher_1,'unread', true);
        expect(data.code).toEqual(2);
        expect(data.message).toEqual("");
        expect(data.success).toEqual(true);
        for (let i = 0; i < data.data.length; i++) {
            let x = data.data[i];
            expect(x).toEqual({
                id: x.id,
                userIdFrom: x.userIdFrom,
                userIdTo:x.userIdTo,
                lastReceivedAt:x.lastReceivedAt,
                countUnread:x.countUnread,
                lastMessage:x.lastMessage
            });
        }
        let results = await SelectFilterUnread(idTeacher_1);
        for (let i = 0; i < data.data.length; i++) {
            let item = data.data[i];
            expect(results[i].id).toEqual(item.id);
            expect(results[i].user_id_from).toEqual(item.userIdFrom);
            expect(results[i].user_id_to).toEqual(item.userIdTo);
            expect(results[i].count_unread).toEqual(item.countUnread);
            expect(results[i].last).toEqual(item.lastMessage);
        }
    });
    test("Validate that it returns read messages", async () => {
        const { data, status } = await GetFilterMessage(idTeacher_1,'read', true);
        expect(data.code).toEqual(2);
        expect(data.message).toEqual("");
        expect(data.success).toEqual(true);
        for (let i = 0; i < data.data.length; i++) {
            let x = data.data[i];
            expect(x).toEqual({
                id: x.id,
                userIdFrom: x.userIdFrom,
                userIdTo:x.userIdTo,
                lastReceivedAt:x.lastReceivedAt,
                countUnread:x.countUnread,
                lastMessage:x.lastMessage
            });
        }
        let results = await SelectFilterRead(idTeacher_1);
        for (let i = 0; i < data.data.length; i++) {
            let item = data.data[i];
            expect(results[i].id).toEqual(item.id);
            expect(results[i].user_id_from).toEqual(item.userIdFrom);
            expect(results[i].user_id_to).toEqual(item.userIdTo);
            expect(results[i].count_unread).toEqual(item.countUnread);
            expect(results[i].last).toEqual(item.lastMessage);
        }
    });
});
describe("The conversation returns_GET", () => {
    test("Validate conversation list between teacher and student", async () => {
        const { data, status } = await GetReturnsConversations(idTeacher_1,idAlumno_2, true);
        expect(data.code).toEqual(2);
        expect(data.message).toEqual("");
        expect(data.success).toEqual(true);
        for (let i = 0; i < data.data.length; i++) {
            let x = data.data[i];
            expect(x).toEqual({
                createdAt: x.createdAt,
                id: x.id,
                message:x.message,
                messageId:x.messageId,
                userIdFrom:x.userIdFrom,
                userIdTo:x.userIdTo
            });
        }
    });
    test("Validate conversation list between  student and teacher", async () => {
        const { data, status } = await GetReturnsConversations(idAlumno_2,idTeacher_1, true);
        expect(data.code).toEqual(2);
        expect(data.message).toEqual("");
        expect(data.success).toEqual(true);
        for (let i = 0; i < data.data.length; i++) {
            let x = data.data[i];
            expect(x).toEqual({
                createdAt: x.createdAt,
                id: x.id,
                message:x.message,
                messageId:x.messageId,
                userIdFrom:x.userIdFrom,
                userIdTo:x.userIdTo
            });
        }
    });
    test("Validate that it does not list non-existent user conversations", async () => {
        const { data, status } = await GetReturnsConversations(idAlumno_SinData,idTeacher_SinData, true);
        expect(data).toEqual({
            code: 2,
            data: [],
            message: "",
            success: true,
        });

    });
});
