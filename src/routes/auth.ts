import { Router } from 'express';
import { AuthServices } from '../services/auth';

export const auth = Router();

auth.post('/register', AuthServices.register);
auth.post('/login', AuthServices.login);
