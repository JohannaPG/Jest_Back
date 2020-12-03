import {idAdmin, idAlumno_2, idTeacher_1} from "../../utilities";
import {PostCreateBanner, PostCreateNews} from "../../src/communication/services/Ad";
import {SelectListBanner, SelectListNews} from "../../src/communication/querys/index_Ad";

//jest --setupFiles dotenv/config
describe("Generate banners_POST",()=>{
    test("Validate that the banner can be generated correctly",async ()=>{
        const body={
            image: "http://imagen.jpg",
            url: "http://urlresource.html",
            segmentProfile: "alumno",
            segmentEnrollment:"CGT",
            authorId: idAdmin,
            finishAt: "2020-12-09 12:12:12",
            startAt: "2020-12-11 12:12:12"
        };
        const {data}=await PostCreateBanner(body,true);
        expect(data).toEqual({
            code: 2,
            data: {
                id: data.data.id,
            },
            message: "SUCCESS",
            success: true
        });
    });
    test("Validate that banner is correctly registered in the database",async ()=>{
        const body={
            image: "http://imagen.jpg",
            url: "http://urlresource.html",
            segmentProfile: "alumno",
            segmentEnrollment:"CGT",
            authorId: idAdmin,
            finishAt: "2020-12-09 12:12:12",
            startAt: "2020-12-11 12:12:12"
        };
        const {data}=await PostCreateBanner(body,true);
        let results = await SelectListBanner(data.data.id);
        expect(results[0].status).toEqual("created");
        expect(results[0].segment_profile).toEqual("alumno");
        expect(results[0].segment_enrollment).toEqual("CGT");
    });
    test("As an admin I can't create a banner, if I don't send an image",async ()=>{
        const body={
            image: "",
            url: "http://urlresource.html",
            segmentProfile: "alumno",
            segmentEnrollment:"CGT",
            authorId: idAdmin,
            finishAt: "2020-12-09",
            startAt: "2020-12-09"
        };
        const {data}=await PostCreateBanner(body,true);
        expect(data).toEqual({
            code: 4,
            data: "La imagen es requerido",
            message: "null TypeString",
            success: false
        });
    });
    test("As admin the system should not allow to create banner without the correct url format",async ()=>{
        const body={
            image: "http://imagen.jpg",
            url: "ht://urlresource.html",
            segmentProfile: "alumno",
            segmentEnrollment:"CGT",
            authorId: idAdmin,
            finishAt: "2020-12-15 12:12:12",
            startAt: "2020-12-11 12:12:12"
        };
        const {data}=await PostCreateBanner(body,true);
        expect(data).toEqual({
            code: 4,
            data: "Url no valida",
            message: "url_error",
            success: false
        });
    });
    test("As admin I can't create a banner, if I don't send the profile",async ()=>{
        const body={
            image: "http://imagen.jpg",
            url: "http://urlresource.html",
            segmentProfile: "",
            segmentEnrollment:"CGT",
            authorId: idAdmin,
            finishAt: "2020-12-09",
            startAt: "2020-12-09"
        };
        const {data}=await PostCreateBanner(body,true);
        expect(data).toEqual({
            code: 4,
            data: "",
            message: "null TypeString",
            success: false
        });
    });
    test("As an admin I can't create a banner, if I don't send the program",async ()=>{
        const body={
            image: "http://imagen.jpg",
            url: "http://urlresource.html",
            segmentProfile: "alumno",
            segmentEnrollment:"",
            authorId: idAdmin,
            finishAt: "2020-12-09",
            startAt: "2020-12-09"
        };
        const {data}=await PostCreateBanner(body,true);
        expect(data).toEqual({
            code: 4,
            data: "",
            message: "null TypeString",
            success: false
        });
    });
    test("As admin I can't create a banner, if I don't send the start date",async ()=>{
        const body={
            image: "http://imagen.jpg",
            url: "http://urlresource.html",
            segmentProfile: "alumno",
            segmentEnrollment:"Pregrado",
            authorId: idAdmin,
            finishAt: "2020-12-09",
            startAt: ""
        };
        const {data}=await PostCreateBanner(body,true);
        expect(data).toEqual({
            code: 4,
            data: "El formato de fecha no es correcto debe ser yyyy-MM-dd",
            message: "Validate Date",
            success: false
        });
    });
    test("As admin I can't create a banner, if I don't send the end date",async ()=>{
        const body={
            image: "http://imagen.jpg",
            url: "http://urlresource.html",
            segmentProfile: "alumno",
            segmentEnrollment:"Pregrado",
            authorId: idAdmin,
            finishAt: "",
            startAt: "2020-12-09"
        };
        const {data}=await PostCreateBanner(body,true);
        expect(data).toEqual({
            code: 4,
            data: "El formato de fecha no es correcto debe ser yyyy-MM-dd",
            message: "Validate Date",
            success: false
        });
    });
    test("I cannot create a banner with an end date less than the initial one",async ()=>{
        const body={
            image: "http://imagen.jpg",
            url: "http://urlresource.html",
            segmentProfile: "alumno",
            segmentEnrollment:"CGT",
            authorId: idAlumno_2,
            finishAt: "2020-12-10 12:12:12",
            startAt: "2020-12-11 12:12:12"
        };
        const {data}=await PostCreateBanner(body,true);
        expect(data).toEqual({
            code: 4,
            data: "El formato de fecha no es correcto debe ser yyyy-MM-dd",
            message: "Validate Date",
            success: false
        });
    });
});
describe("Generate news_POST",()=>{
    test("Validate that the news can be generated correctly ",async ()=>{
        const body={
            image: "http://s3.imageQA.png",
            title: "Inicio de clases 2021",
            description: "El director academico inicia el ciclo académico",
            segmentProfile: "alumno",
            segmentEnrollment: "pregrado",
            segmentFile: "",
            isNotified: false,
            finishAt: "2020-12-12",
            startAt: "2020-12-01",
            authorId: idAdmin
        };
        const {data}=await PostCreateNews(body,true);
        expect(data).toEqual({
            code: 2,
            data: {
                id: data.data.id,
            },
            message: "SUCCESS",
            success: true
        });
    });
    test("Validate that the news can be generated correctly by loading DB",async ()=>{
        const body={
            image: "http://s3.imageQA.png",
            title: "Inicio de clases 2021",
            description: "El director academico inicia el ciclo académico",
            segmentProfile: "",
            segmentEnrollment: "",
            segmentFile: "http://alumno.csv",
            isNotified: false,
            finishAt: "2020-12-12",
            startAt: "2020-12-01",
            authorId: idAdmin

        };
        const {data}=await PostCreateNews(body,true);
        expect(data).toEqual({
            code: 2,
            data: {
                id: data.data.id,
            },
            message: "SUCCESS",
            success: true
        });
    });
    test("Validate that they cannot send news with a BD load and sending the segmentation",async ()=>{
        const body={
            image: "http://s3.imageQA.png",
            title: "Inicio de clases 2021",
            description: "El director academico inicia el ciclo académico",
            segmentProfile: "alumno",
            segmentEnrollment: "pregrado",
            segmentFile: "http://alumno.csv",
            isNotified: false,
            finishAt: "2020-12-12",
            startAt: "2020-12-01",
            authorId: idAdmin

        };
        const {data}=await PostCreateNews(body,true);
        expect(data).toEqual({
            code: 4,
            data: {},
            message: "Mandar file o Profile,Enrollmen",
            success: false
        });
    });
    test("Validate that news is correctly registered in the database",async ()=>{
        const body={
            image: "http://s3.imageQA.png",
            title: "Inicio de clases 2021",
            description: "El director academico inicia el ciclo académico",
            segmentProfile: "alumno",
            segmentEnrollment: "pregrado",
            segmentFile: "",
            isNotified: false,
            finishAt: "2020-12-12",
            startAt: "2020-12-01",
            authorId: idAdmin
        };
        const {data}=await PostCreateNews(body,true);
        let results = await SelectListNews(data.data.id);
        expect(results[0].status).toEqual("created");
        expect(results[0].segment_profile).toEqual("alumno");
        expect(results[0].segment_enrollment).toEqual("pregrado");
    });
    test("Validate that the news cannot be generated if the image is not sent",async ()=>{
        const body={
            image: "",
            title: "Inicio de clases 2021",
            description: "El director academico inicia el ciclo académico",
            segmentProfile: "alumno",
            segmentEnrollment: "pregrado",
            segmentFile: "htt://holi.csv",
            isNotified: false,
            finishAt: "2020-12-12",
            startAt: "2020-12-01",
            authorId: idAdmin
        };
        const {data}=await PostCreateNews(body,true);
        console.log(data);
        expect(data).toEqual({
            code: 4,
            data: "La imagen es requerida",
            message: "error",
            success: false
        });
    });
    test("Validate that the news cannot be generated if the title is not sent",async ()=>{
        const body={
            image: "http://imageQA.jpg",
            title: "",
            description: "El director academico inicia el ciclo académico",
            segmentProfile: "alumno",
            segmentEnrollment: "pregrado",
            segmentFile: "",
            isNotified: false,
            finishAt: "2020-12-12",
            startAt: "2020-12-01",
            authorId: idAdmin
        };
        const {data}=await PostCreateNews(body,true);
        expect(data).toEqual({
            code: 4,
            data: "El titulo es requerido",
            message: "error",
            success: false
        });
    });
    test("Validate that the news cannot be generated if the description is not sent",async ()=>{
        const body={
            image: "http://imageQA.jpg",
            title: "Prueba de QA desde Jest",
            description: "",
            segmentProfile: "alumno",
            segmentEnrollment: "pregrado",
            segmentFile: "",
            isNotified: false,
            finishAt: "2020-12-12",
            startAt: "2020-12-01",
            authorId: idAdmin
        };
        const {data}=await PostCreateNews(body,true);
        expect(data).toEqual({
            code: 4,
            data: "La descripcion es requerida",
            message: "error",
            success: false
        });
    });
    test("Validate that the news cannot be generated if the finishAt is not sent",async ()=>{
        const body={
            image: "http://imageQA.jpg",
            title: "Prueba de QA desde Jest",
            description: "Mandando la descripción",
            segmentProfile: "alumno",
            segmentEnrollment: "pregrado",
            segmentFile: "",
            isNotified: false,
            finishAt: "",
            startAt: "2020-12-01",
            authorId: idAdmin
        };
        const {data}=await PostCreateNews(body,true);
        expect(data).toEqual({
            code: 4,
            data: "El formato de fecha no es correcto debe ser yyyy-MM-dd",
            message: "Validate Date",
            success: false
        });
    });
    test("Validate that the news cannot be generated if the startAt is not sent",async ()=>{
        const body={
            image: "http://imageQA.jpg",
            title: "Prueba de QA desde Jest",
            description: "Mandando la descripción",
            segmentProfile: "alumno",
            segmentEnrollment: "pregrado",
            segmentFile: "",
            isNotified: false,
            finishAt: "2020-12-31",
            startAt: "",
            authorId: idAdmin
        };
        const {data}=await PostCreateNews(body,true);
        expect(data).toEqual({
            code: 4,
            data: "El formato de fecha no es correcto debe ser yyyy-MM-dd",
            message: "Validate Date",
            success: false
        });
    });
    test("Validate that the news cannot be generated if the authorId is not sent",async ()=>{
        const body={
            image: "http://imageQA.jpg",
            title: "Prueba de QA desde Jest",
            description: "Mandando la descripción",
            segmentProfile: "alumno",
            segmentEnrollment: "pregrado",
            segmentFile: "",
            isNotified: false,
            finishAt: "2020-12-31",
            startAt: "2020-12-01",
            //authorId: idAdmin
        };
        const {data}=await PostCreateNews(body,true);
        expect(data).toEqual({
            code: 4,
            data: "El authorId es requerido",
            message: "null TypeId",
            success: false
        });
    });
    test("Validate that they cannot send news if the start date is greater than the end date",async ()=>{
        const body={
            image: "http://imageQA.jpg",
            title: "Prueba de QA desde Jest",
            description: "Mandando la descripción",
            segmentProfile: "alumno",
            segmentEnrollment: "pregrado",
            segmentFile: "",
            isNotified: false,
            finishAt: "2020-12-30",
            startAt: "2020-12-31",
            authorId: idAdmin
        };
        const {data}=await PostCreateNews(body,true);
        expect(data).toEqual({
            code: 4,
            data: {},
            message: "La fecha finishAt debe ser mayor a startAt",
            success: false
        });
    });
});