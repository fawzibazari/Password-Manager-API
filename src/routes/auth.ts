import { Router } from 'express';
import { AuthServices } from '../services/auth';
import { IS_AUTHENTIFICATED } from './password';

export const auth = Router();

auth.post('/register', AuthServices.register);
auth.post('/login', AuthServices.login);
auth.get('/users', IS_AUTHENTIFICATED, AuthServices.listAll);
