import { CreateCourse }from '../../src/course/services/Course'
import { GetCourse }from '../../src/course/services/Course'
import { CreateSection }from '../../src/course/services/Section'
import { courseMaker } from '../models/course/course'
import { sectionMaker } from '../models/section/section'
import CreateAdminToken from '../../src/auth/services/LoginUser'
import {SelectCourseByCourseId} from '../../src/course/querys/index_Course'
import {SelectCourseByCourseCode} from '../../src/course/querys/index_Course'

let REQUEST_TOKEN = ''

beforeAll(async () => {
  const { data } = await CreateAdminToken()
  REQUEST_TOKEN = data.token
 
})

describe('Crear curso/seccion valido y asignarlo a un profesor', () => {
   it('Crear y obtener un curso con estructura válida', async () => {
  const course = courseMaker()  
  expect.assertions(4);
  const {
  status, data
   }  = await CreateCourse (course, REQUEST_TOKEN, true)
   expect(status).toBe(200)  

  let results = await SelectCourseByCourseId(data.data.id);
   expect(results[0].course_id).toEqual(data.data.id);

  const data_get  = await GetCourse (data.data.id, REQUEST_TOKEN, true)
   expect(data_get.status).toBe(200)  
   expect(data_get.data).toMatchSnapshot();  
  })


  it('Crear secciones con unidades relacionadas al curso', async () => {
  const course_code = courseMaker().code
  let results = await SelectCourseByCourseCode(course_code);
  const course_id = results[0].course_id

  const section = sectionMaker() 
   const {
      status, data
    }  = await CreateSection  (course_id, section ,REQUEST_TOKEN, true)
   expect(status).toBe(200) 
   
   })

})

//TODO: eliminar registros despues de pasar el test (rollback)