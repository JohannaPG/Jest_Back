import {
    GetListUserQueryParameters, GetListUserId,
} from "../../src/serviceCore/services/search";
import {idTeacher_1, idSection_1, IdAlumno_4, idAlumno_2} from "../../utilities";

describe("Search for users_GET", () => {
    test("As a student I want to search for a teacher by name, session, role", async () => {
        const { data, status } = await GetListUserQueryParameters(idTeacher_1,'Johanna',idSection_1,10,'teacher', true);
        expect(data.code).toEqual(2);
        expect(data.message).toEqual("");
        expect(data.success).toEqual(true);
        for (let i = 0; i < data.data.length; i++) {
            let x = data.data[i];
            expect(x).toEqual({
                id: x.id,
                image: x.image,
                firstName:x.firstName,
                lastName:x.lastName,
                code:x.code,
                email:x.email,
                role:x.role
            });
        }

    });
    test("As a student I want to search for a teacher by name", async () => {
        const { data, status } = await GetListUserId(idTeacher_1, true);
        expect(data.code).toEqual(2);
        expect(data.message).toEqual("");
        expect(data.success).toEqual(true);
        for (let i = 0; i < data.data.length; i++) {
            let x = data.data[0];
            expect(x).toEqual({
                id: x.id,
                image: x.image,
                firstName:x.firstName,
                lastName:x.lastName,
                code:x.code,
                email:x.email,
                role:x.role,
                courses:[{
                    id:x.courses[0].id,
                    name:x.courses[0].name,
                    seccionId:x.courses[0].seccionId,
                    seccionCode:x.courses[0].seccionCode
                }]
            });
        }

    });
    test("As a teacher I want to search for a student by name, session, role", async () => {
        const { data, status } = await GetListUserQueryParameters(idAlumno_2,'Geo',idSection_1,10,'student', true);
        expect(data.code).toEqual(2);
        expect(data.message).toEqual("");
        expect(data.success).toEqual(true);
        for (let i = 0; i < data.data.length; i++) {
            let x = data.data[i];
            expect(x).toEqual({
                id: x.id,
                image: x.image,
                firstName:x.firstName,
                lastName:x.lastName,
                code:x.code,
                email:x.email,
                role:x.role
            });
        }

    });
});