import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../models";
import config from "../config/config";

class AuthController {    
  static login = async (req: Request, res: Response) => {
    let { email, password } = req.body;
    console.log(">>> AuthController.login username: " + email);
    if (!(email && password)) {
      return res.status(400).send();
    }

    // TODO: user UserRepository
    const userRepository = getRepository(User);
    let user;    
    try {
      user = await userRepository.findOneOrFail({ where: { email: email } });
    } catch (error) {
      console.log(">>> Cant find username")
      return res.status(401).send();
    }

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      console.log(">>> Passwords are not equal")
        return res.status(401).send();
    }
  
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    res.send(token);
  };

  static changePassword = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId;

    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      return res.status(401).send();
    }

    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      return res.status(401).send();
    }

    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    user.hashPassword(newPassword);
    userRepository.save(user);

    res.status(204).send();
  };
}
export default AuthController;