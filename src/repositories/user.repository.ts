import { getRepository } from "typeorm";
import { User } from "../models";

// TODO: merge with types in controllers or make types file
export type CreateUserData = {
  fullName: string;
  email: string;
  password: string;
}

export const getUsers = async (): Promise<Array<User>> => {
  const userRepository = getRepository(User);
  const users = userRepository.find({
    select: ["fullName", "email"] 
  });
  return users;
};

export const createUser = async (payload: CreateUserData): Promise<User> => {
  const userRepository = getRepository(User);
  const user = new User();
  return userRepository.save({
    ...user,
    ...payload,
    role: 'user'
  });
};

export const getUser = async (id: number): Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id: id });
  if (!user) return null;
  return user;
};