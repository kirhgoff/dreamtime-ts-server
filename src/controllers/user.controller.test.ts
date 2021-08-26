// import UserController from "./user.controller";
// import * as UserRepository from "../repositories/user.repository";
// import { generateUsersData } from "../../test/utils/generate";

// /** 
//  https://stackoverflow.com/questions/61693597/how-to-mock-typeorms-getcustomrepository
// import { Controller } from './controller';
// import { getCustomRepository } from 'typeorm';
// import { mocked } from 'ts-jest/utils';
// import { UserRepository } from './userRepo';

// jest.mock('typeorm', () => ({ getCustomRepository: jest.fn() }));

// describe('61693597', () => {
//   it('should pass', async () => {
//     const userRepo = { findUser: jest.fn().mockResolvedValueOnce('fake user') };
//     mocked(getCustomRepository).mockReturnValueOnce(userRepo);
//     const controller = new Controller();
//     const actual = await controller.init();
//     expect(actual).toBe('fake user');
//     expect(getCustomRepository).toBeCalledWith(UserRepository);
//     expect(userRepo.findUser).toBeCalledWith(1);
//   });
// });
//  */
// afterEach(() => {
//   jest.resetAllMocks();
// });

// describe("UserController", () => {
//   describe("getUsers", () => {
//     test("should return empty array", async () => {
//       const spy = jest
//         .spyOn(UserRepository, "getUsers")
//         .mockResolvedValueOnce([]);

//       const controller = new UserController();
//       const users = await controller.getUsers();

//       expect(users).toEqual([]);
//       expect(spy).toHaveBeenCalledWith();
//       expect(spy).toHaveBeenCalledTimes(1);
//     });

//     test("should return user list", async () => {
//       const usersData = generateUsersData(2);
//       const spy = jest
//         .spyOn(UserRepository, "getUsers")
//         .mockResolvedValueOnce(usersData);

//       const controller = new UserController();
//       const users = await controller.getUsers();
//       expect(users).toEqual(usersData);
//       expect(spy).toHaveBeenCalledWith();
//       expect(spy).toHaveBeenCalledTimes(1);
//     });
//   });
// });