import { Router } from 'express';
import { PasswordServices } from '../services/passwords';

export const password = Router();

password.post('/addpassword', PasswordServices.newPassword);
