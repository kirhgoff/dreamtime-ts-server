import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../models";
import {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  CreateUserData
} from "../repositories/user.repository";

interface UserPreview {
  id: string | null; // TODO: make it signed id
  fullName: string;
  email: string;
}

// TODO: ask Rico if this could be expressed better in Typescript
function buildUserPreview(user: User | null) : UserPreview {
  return {
    id: String(user?.id), 
    email: user?.email ?? 'nomail@example.ru', 
    fullName: user?.fullName ?? 'MrInvalid'
  }
}

@Route("users")
@Tags("User")
export default class UserController {

  @Get("/")
  public async getUsers(): Promise<Array<UserPreview>> {
    return (await getUsers()).map(user => buildUserPreview(user));
  }

  @Post("/")
  public async createUser(@Body() body: CreateUserData): Promise<UserPreview> {
    return buildUserPreview(await createUser(body));
  }

  @Post("/")
  public async deleteUser(@Path() id: string): Promise<UserPreview> {
    return buildUserPreview(await deleteUser(Number(id)));
  }

  @Get("/:id")
  public async getUser(@Path() id: string): Promise<UserPreview | null> {
    return buildUserPreview(await getUser(Number(id)));
  }
}



  // static listAll = async (req: Request, res: Response) => {
  //   //Get users from database
  //   const userRepository = getRepository(User);
  //   const users: IUserPayload[] = await userRepository.find({
  //     select: ["fullName", "email"] //We dont want to send the passwords on response
  //   }) as IUserPayload[]; 
  
  //   //Send the users object
  //   return res.send(users);
  // };
  
  // static getOneById = async (req: Request, res: Response) => {
  //   //Get the ID from the url
  //   const id: number = Number(req.params.id);
  
  //   //Get the user from database
  //   const userRepository = getRepository(User);
  //   try {
  //     const user = await userRepository.findOneOrFail(id, {
  //       select: ["id", "fullName", "role"] //We dont want to send the password on response
  //     });
  //   } catch (error) {
  //     return res.status(404).send("User not found");
  //   }
  // };
  
  // static newUser = async (req: Request, res: Response) => {
  //   //Get parameters from the body
  //   let { username, password, role } = req.body;
  //   let user = new User();
  //   user.fullName = username;
  //   user.password = password;
  //   user.role = role;
  
  //   //Validade if the parameters are ok
  //   const errors = await validate(user);
  //   if (errors.length > 0) {
  //     return res.status(400).send(errors);
  //   }
  
  //   //Hash the password, to securely store on DB
  //   user.hashPassword();
  
  //   //Try to save. If fails, the username is already in use
  //   const userRepository = getRepository(User);
  //   try {
  //     await userRepository.save(user);
  //   } catch (e) {
  //     return res.status(409).send("username already in use");
  //   }
  
  //   //If all ok, send 201 response
  //   return res.status(201).send("User created");
  // };
  
  // static editUser = async (req: Request, res: Response) => {
  //   //Get the ID from the url
  //   const id = req.params.id;
  
  //   //Get values from the body
  //   const { username, role } = req.body;
  
  //   //Try to find user on database
  //   const userRepository = getRepository(User);
  //   let user;
  //   try {
  //     user = await userRepository.findOneOrFail(id);
  //   } catch (error) {
  //     //If not found, send a 404 response
  //     return res.status(404).send("User not found");
  //   }
  
  //   //Validate the new values on model
  //   user.fullName = username;
  //   user.role = role;
  //   const errors = await validate(user);
  //   if (errors.length > 0) {
  //     return res.status(400).send(errors);
  //   }
  
  //   //Try to safe, if fails, that means username already in use
  //   try {
  //     await userRepository.save(user);
  //   } catch (e) {
  //     res.status(409).send("username already in use");
  //     return;
  //   }
  //   //After all send a 204 (no content, but accepted) response
  //   res.status(204).send();
  // };
  
  // static deleteUser = async (req: Request, res: Response) => {
  //   //Get the ID from the url
  //   const id = req.params.id;
  
  //   const userRepository = getRepository(User);
  //   let user: User;
  //   try {
  //     user = await userRepository.findOneOrFail(id);
  //   } catch (error) {
  //     res.status(404).send("User not found");
  //     return;
  //   }
  //   userRepository.delete(id);
  
  //   //After all send a 204 (no content, but accepted) response
  //   res.status(204).send();
  // };
