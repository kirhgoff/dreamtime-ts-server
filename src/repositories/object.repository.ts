import { getRepository } from "typeorm";
import { Geometry, Point } from 'geojson';

import { WorldObject } from "../models";

// TODO: merge with types in controllers or make types file
export type CreateObjectData = {
  type: string;
  lat: number;
  long: number;
  ownerId: number;
  data: string;
}

export type WorldObjectWithDistance = {
  id: string;
  type: string;
  lat: number;
  long: number;
  ownerId: number;
  data: string;
  distance: number;
}

export const getObjects = async (): Promise<Array<WorldObject>> => {
  return await getRepository(WorldObject).find();
};

// TODO: implement validate properly
const validate = (object: any): any => {
  // TODO: use enums for type
  return object;
}

export const createObject = async (payload: CreateObjectData): Promise<WorldObject> => {
  const userRepository = getRepository(WorldObject);

  const object = new WorldObject();
  object.type = validate(payload.type);
  object.lat = validate(payload.lat);
  object.long = validate(payload.long);
  object.data = validate(payload.data);
  object.location = {
    type: "Point",
    coordinates: [object.long, object.lat]
  } as Point;

  return userRepository.save({...object});
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

async function getSqlObjects(origin: { coordinates: number[]; type: string }, range: number) {
  return await getRepository(WorldObject)
      .createQueryBuilder('world_objects')
      .select([
        'world_objects.*',
        'ST_Distance(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location))) AS distance'
      ])
      .where("ST_DWithin(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)), :range)")
      .orderBy("distance", "ASC")
      .setParameters({
        origin: JSON.stringify(origin),
        range: range
      })
      .getRawMany();
}

// TODO: change to have only userId in params
export const getSurroundings = async (lat: number, long: number, range: number = 100): Promise<WorldObject[]> => {
  let origin = { type: "Point", coordinates: [long, lat]};
  return await getSqlObjects(origin, range);
}

export const getSurroundings2 = async (lat: number, long: number, range: number = 100): Promise<WorldObjectWithDistance[]> => {
  let origin = { type: "Point", coordinates: [long, lat]};
  return await getSqlObjects(origin, range);
}

