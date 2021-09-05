import { getRepository } from "typeorm";
import { WorldObject } from "../models";

// TODO: merge with types in controllers or make types file
export type CreateObjectData = {
  fullName: string;
  email: string;
  password: string;
}

export const getObjects = async (): Promise<Array<WorldObject>> => {
  return await getRepository(WorldObject).find();
};

export const createObject = async (payload: CreateObjectData): Promise<WorldObject> => {
  const userRepository = getRepository(WorldObject);

  const user = new WorldObject(); 
//   user.email = payload.email,
//   user.fullName = payload.fullName
//   user.hashPassword(payload.password)
//   user.role = "user"

  return userRepository.save({...user});
};

export const getObject = async (id: number): Promise<WorldObject | null> => {
  return await getRepository(WorldObject).findOne({
    where: { id: id }
  }) ?? null;
};

export const deleteObject = async (id: number): Promise<WorldObject | null> => {
  let repository = getRepository(WorldObject)

  const user = await repository.findOne({ 
    where: { id: id }
  }) ?? null;

  return repository.delete({ id: id }).then(_ => {
    if (typeof user == undefined ) {
      return null;
    } else {
      return user;
    }  
  });
};