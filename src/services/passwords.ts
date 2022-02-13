import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Passwords } from '../models/Passwords';
import { EncryptionServices } from './Encryption';

export class PasswordServices {
  static async newPassword(req: Request, res: Response) {
    const { password, website } = req.body;
    let EncryptedPassword: any = null;
    try {
      EncryptedPassword = await EncryptionServices.encrypt(password);
    } catch (error) {
      res.status(409).send('check your json');
      return;
    }

    const passwords = new Passwords();
    passwords.website = website;
    passwords.password = EncryptedPassword.password;
    passwords.iv = EncryptedPassword.iv;

    const PasswordsRepository = getRepository(Passwords);

    try {
      await PasswordsRepository.save(passwords);
    } catch (e) {
      res.status(409).send('error');
      return;
    }

    res.status(201).send('Password was saved with success 👏');
  }

  static ShowPasswords = async (req: Request, res: Response) => {
    //Get users from database
    const PasswordsRepository = getRepository(Passwords);
    const passwords = await PasswordsRepository.find();
    res.send(passwords);
  };
}
