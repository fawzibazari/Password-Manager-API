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
  static DecryptPassword = async (req: Request, res: Response) => {
    res.send(await EncryptionServices.decrypt(req.body));
    console.log(EncryptionServices.decrypt(req.body));

    return;
  };
  static async deletePassword(req: Request, res: Response) {
    const id = req.params.id;

    const PasswordsRepository = getRepository(Passwords);
    let passwords: Passwords;
    try {
      passwords = await PasswordsRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('User pas trouvé');
      return;
    }
    PasswordsRepository.delete(id);
    res.status(204).send(passwords);
  }
}
