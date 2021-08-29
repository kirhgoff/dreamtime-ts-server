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
    select: ["id", "fullName", "email"] 
  });
  return users;
};

export const createUser = async (payload: CreateUserData): Promise<User> => {
  const userRepository = getRepository(User);

  const user = new User(); 
  user.email = payload.email,
  user.fullName = payload.fullName
  user.password = payload.password
  user.role = "user"

  return userRepository.save({...user});
};

export const getUser = async (id: number): Promise<User | null> => {
  return await getRepository(User).findOne({ 
    select: ["id", "fullName", "email"],
    where: { id: id }
  }) ?? null;
};

// TODO: ask Rico how to fix that
export const deleteUser = async (id: number): Promise<User | null> => {
  let repository = await getRepository(User)
  const user = repository.findOne({ 
    select: ["id", "fullName", "email"],
    where: { id: id }
  }) ?? null;

  await repository.delete({ id: id });

  if (typeof user == undefined ) {
    return null;
  } else {
    return user as Promise<User>
  }
};