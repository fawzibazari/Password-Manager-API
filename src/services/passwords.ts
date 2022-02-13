import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Passwords } from '../models/Passwords';
import { EncryptionServices } from './Encryption';

export class PasswordServices {
  static async newPassword(req: Request, res: Response) {
    const { password, website } = req.body;

    const EncryptedPassword = await EncryptionServices.encrypt(password);

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
}
