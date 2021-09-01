import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Object } from "../models";
import {
  getObjects,
  createObject,
  CreateObjectData
} from "../repositories/object.repository";

interface ObjectPreview {
  id: string; // TODO: make it signed id
  fullName: string;
}

function buildObjectPreview(user: Object | null) : ObjectPreview {
  return {
    id: String(user?.id), 
    fullName: user?.fullName ?? 'MrInvalid'
  }
}

@Route("objects")
@Tags("Object")
export default class UserController {

  @Get("/")
  public async getObjects(): Promise<Array<ObjectPreview>> {
    return (await getObjects()).map(object => buildObjectPreview(object));
  }

  @Post("/")
  public async createObject(@Body() body: CreateObjectData): Promise<ObjectPreview> {
    return buildObjectPreview(await createObject(body));
  }
}