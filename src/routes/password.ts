import { Router } from 'express';
import { PasswordServices } from '../services/passwords';
import passport from 'passport';

export const password = Router();

export const IS_AUTHENTIFICATED = passport.authenticate('jwt', {
  session: false,
});

password.post('/addpassword', IS_AUTHENTIFICATED, PasswordServices.newPassword);

password.get(
  '/getpassword',
  IS_AUTHENTIFICATED,
  PasswordServices.ShowPasswords,
);
