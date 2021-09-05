import { Get, Route, Tags, Post, Body, Path } from "tsoa";

import { WorldObject } from "../models";
import {getObjects, createObject, deleteObject, getObject, CreateObjectData} from "../repositories/object.repository";

interface ObjectPreview {
  id: string; // TODO: make it signed id
  type: string,
  lat: number,
  long: number,
  data: string
}

function buildObjectPreview(user: WorldObject | null) : ObjectPreview {
  return {
    id: String(user?.id),
    type: String(user?.type),
    lat: Number(user?.lat),
    long: Number(user?.long),
    data: String(user?.data)
  }
}

@Route("objects")
@Tags("Object")
export default class ObjectController {

  @Get("/")
  public async getObjects(): Promise<Array<ObjectPreview>> {
    return (await getObjects()).map(object => buildObjectPreview(object));
  }

  @Post("/")
  public async createObject(@Body() body: CreateObjectData): Promise<ObjectPreview> {
    return buildObjectPreview(await createObject(body));
  }

  @Post("/")
  public async deleteUser(@Path() id: string): Promise<ObjectPreview> {
    return buildObjectPreview(await deleteObject(Number(id)));
  }

  @Get("/:id")
  public async getUser(@Path() id: string): Promise<ObjectPreview | null> {
    return buildObjectPreview(await getObject(Number(id)));
  }
}
