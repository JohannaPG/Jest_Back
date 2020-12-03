import faker from 'faker'

export const studentMaker = (parameters = {}) => {
  const { campus = 'LIMA', acadCareer = 'PREG' } = parameters
  const email = faker.internet.email().toLocaleLowerCase()
  const picture =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTIkrPf6sXGDDEFRqLa1XCtomArTNWzfRGhlxGqejNVYi4-yBTV&usqp=CAU'
  return {
    email,
    code: 'demo',
    documentType: 'DNI',
    documentNumber: '90909090',
    firstName: 'Usuario',
    lastName: 'Demo',
    campus,
    acadCareer,
    birthdate: '1986-12-04',
    picture,
    auth: {
      password: 'utp123'
    }
  }
}
