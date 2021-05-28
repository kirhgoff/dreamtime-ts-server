import faker from "faker";

export function generateUserData(overide = {}) {
  return {
    id: faker.datatype.number(),
    fullName: faker.name.firstName(),
    email: faker.internet.email(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide,
  };
}

export function generateUsersData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateUserData({ id: i, ...overide });
    }
  );
}