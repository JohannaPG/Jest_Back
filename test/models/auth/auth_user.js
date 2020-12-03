import faker from 'faker'

export const userAuthMaker = (role) => {
  const email = faker.internet.email().toLocaleLowerCase()
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const code = 'C' + faker.random.number({
    'min': 1000,
    'max': 9999
});
  return {
    email,
    code,
    documentType: 'DNI',
    documentNumber: '90909090',
    firstName,
    lastName,
    auth: {
      password: 'utp123',
      roles : [role],
      provider: "CUSTOM"
    }
  }
}

export const userAuthLogin = (login, password, role) => {
 
  return {
    login,
    password,
    role,
      
    }
  }




