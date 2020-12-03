
export const courseMaker = () => {
 
  const code = '100000XYZW'
  const contentTypes = ["VIDEO", "AUDIO", "PDF"]
  const introduction = {  
    "videoUrl":"https://vimeo.com/386031368/5a6248eefb",
    "imageUrl":"http://placehold.it/",
    "width": "100",
    "height":"100"
 }
  return {
    name: 'Curso Custom',
    description: 'El curso Custom pretende que el estudiante conozca las organizaciones e instituciones y cómo éstas pueden obtener ventajas competitivas en base al desarrollo de su personal. Tendrá en cuenta las herramientas idóneas para desarrollar modelos de trabajo de alto desempeño y con resultados que beneficiarán tanto a los trabajadores como la organización. Además, aplicará elementos conceptuales, analíticos y prácticos de la administración del personal, teniendo en cuenta aspectos administrativos gerenciales que influyan en el desarrollo de las personas y organizaciones en un mundo altamente competitivo y globalizado.',
    introduction,
    achievements: ["Al finalizar el curso, el estudiante aplica políticas, procedimientos y herramientas de gestión derecursos humanos, de manera sistémica y ética"],
    level: 'Básico',
    contentTypes,
    language: 'Español',
    code
    
  }
}



export const courseMakerUpdate = () => {
 
  const code = '100000UPDA'
  const contentTypes = ["VIDEO", "AUDIO"]
  const introduction = {  
    "videoUrl":"https://vimeo.com/372980369",
    "imageUrl":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTES31yIjpGm27V3OmBd2Y8BsOQPZSPdrwTrw&usqp=CAU",
    "width": 50,
    "height":50
 }
  return {
    name: 'Curso Custom Actualizado',
    description: 'El curso Custom actualizado pretende que el estudiante conozca las organizaciones e instituciones y cómo éstas pueden obtener ventajas competitivas en base al desarrollo de su personal. Tendrá en cuenta las herramientas idóneas para desarrollar modelos de trabajo de alto desempeño y con resultados que beneficiarán tanto a los trabajadores como la organización. Además, aplicará elementos conceptuales, analíticos y prácticos de la administración del personal, teniendo en cuenta aspectos administrativos gerenciales que influyan en el desarrollo de las personas y organizaciones en un mundo altamente competitivo y globalizado.',
    introduction,
    achievements: ["Al finalizar el curso actualizado, el estudiante aplica políticas, procedimientos y herramientas de gestión derecursos humanos, de manera sistémica y ética"],
    level: 'Dificil',
    contentTypes,
    language: 'Español/Inglés',
    code
    
  }
}

