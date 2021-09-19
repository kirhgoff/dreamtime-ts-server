import { Get, Route, Tags, Post, Body, Path } from "tsoa";

import { WorldObject } from "../models";
import {
  getObjects,
  createObject,
  deleteObject,
  getObject,
  CreateObjectData,
  getSurroundings,
  getSurroundings2, WorldObjectWithDistance
} from "../repositories/object.repository";

interface ObjectPreview {
  id: string; // TODO: make it signed id
  type: string,
  lat: number,
  long: number,
  data: string
}

interface ObjectPreviewWithDistance {
  id: string; // TODO: make it signed id
  type: string,
  lat: number,
  long: number,
  data: string,
  distance: number;
}

interface UserWorldView {
  objects: ObjectPreview[]
}

interface UserWorldView2 {
  objects: ObjectPreviewWithDistance[]
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

function buildObjectPreview2(user: WorldObjectWithDistance | null) : ObjectPreviewWithDistance {
  return {
    id: String(user?.id),
    type: String(user?.type),
    lat: Number(user?.lat),
    long: Number(user?.long),
    data: String(user?.data),
    distance: Number(user?.distance)
  }
}


@Route("objects")
@Tags("Object")
export default class ObjectController {

  @Get()
  public async getObjects(): Promise<Array<ObjectPreview>> {
    return (await getObjects()).map(object => buildObjectPreview(object));
  }

  @Post()
  public async createObject(@Body() body: CreateObjectData): Promise<ObjectPreview> {
    return buildObjectPreview(await createObject(body));
  }

  @Post("/:id")
  public async deleteUser(@Path() id: string): Promise<ObjectPreview> {
    return buildObjectPreview(await deleteObject(Number(id)));
  }

  @Get("/:id")
  public async getUser(@Path() id: string): Promise<ObjectPreview | null> {
    return buildObjectPreview(await getObject(Number(id)));
  }

  // TODO: extract type or leave?
  @Post("/around")
  public async getSurroundings(@Body() body: {
    lat: number,
    long: number,
    range: number
  }): Promise<UserWorldView> {
    // could add a range for to the returned object
    const objects = (await getSurroundings(body.lat, body.long, body.range))
        .map(object => buildObjectPreview(object));

    return { objects: objects };
  }

  @Post("/around")
  public async getSurroundings2(@Body() body: {
    lat: number,
    long: number,
    range: number
  }): Promise<UserWorldView2> {
    // could add a range for to the returned object
    const objects = (await getSurroundings2(body.lat, body.long, body.range))
        .map(object => buildObjectPreview2(object));

    return { objects: objects };
  }
}
