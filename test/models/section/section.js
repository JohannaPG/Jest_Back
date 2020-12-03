
export const sectionMaker = () => {
 
  const sectionCode = '2202100000XYZW10711'
  const classNumber = '10711'
  const period = '2202'
  const teacherId = '9daa3176-9b96-3bd3-86ef-04d9141bd541'
  const campus = 'AREQU'
  const program = 'PINDS'
  const modality = 'P'
  const turn = 'M'
  const module = '001'
  const acadCareer = 'PREG'
  const cycle = '07'
  const faculty = 'PPEGYH'
  const classroom = 'Aula Automatización'
  const active = true
  const capacity = '30'
  const start = '2020-10-25T00:00:00.000Z'
  const end = '2020-12-25T00:00:00.000Z'


  const unities = [
  {  
      "name":"Diseño de perfiles de puestos",
      "description":"Proident adipisicing deserunt mollit et et irure laborum mollit.",
      "order": "1",
      "introduction":{  
         "videoUrl":"http://placehold.it/",
         "imageUrl":"http://placehold.it/",
         "width":"54",
         "height": "54"
      },
      "achievements":[  
         "Al finalizar la unidad, el estudiante diseña perfiles de puestos teniendo en cuenta las competencias generales y específicas del puesto requerido, basándose en su conocimiento de las funciones del área de GTH, los objetivos y estructura de la empresa"
      ]
   },
   {  
      "name":"Proceso de selección de personal",
      "description":"Al finalizar la unidad, el estudiante conocerá la dinámica y el funcionamiento de otras importantes opciones financieras como los mercados de derivados, el mercado forex, los mercados de dinero y los bonos de inversión.",
      "order": "2",
      "introduction":{  
         "videoUrl":"http://placehold.it/",
         "imageUrl":"http://placehold.it/",
         "width":"97",
         "height": "97"
      },
      "achievements":[  
         "Al finalizar la unidad, el estudiante aplica un proceso de selección idóneo, justificando sus elecciones en función del perfil establecido y los objetivos de la empresa"
      ]
      
   }

  ]  
   
 
  return {
    sectionCode,
    classNumber, 
    period,
    teacherId,
    campus,
    program,
    modality,
    turn,
    module,
    acadCareer,
    cycle,
    faculty,
    classroom,
    active,
    capacity,
    start,
    end,
    unities
    
  }
}
