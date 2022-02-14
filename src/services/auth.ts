import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';
import * as jwt from 'jsonwebtoken';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export const secret: string | any = process.env.jwtSecret;

export class AuthServices {
  static async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    try {
      user.hashPassword();
    } catch (e) {
      res.status(409).send('check your json please');
      return;
    }

    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('email already used');
      return;
    }

    res.status(201).send('user created');
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send();
    }

    const userRepository = getRepository(User);
    let user!: User;

    try {
      user = await userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      res.status(401).send();
    }

    try {
      if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        res.status(401).send('false credentials');
        return;
      }
    } catch (error) {}

    try {
      const token = jwt.sign({ id: user.id, email: user.email }, secret, {
        expiresIn: process.env.expiresIn,
      });

      res.send({ token, expiresIn: process.env.expiresIn, user });
    } catch (error) {
      return error;
    }
  }

  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.send(users);
  };
}
