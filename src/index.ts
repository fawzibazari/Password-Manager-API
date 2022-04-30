import express, { Application, Request, Response } from 'express';
import { createConnection } from 'typeorm';
import cors from 'cors';
import { password } from './routes/password';
import { auth } from './routes/auth';
import passport from 'passport';
import passportMiddleware from './middlewares/jwt';
import { User } from './models/User';
import { Passwords } from './models/Passwords';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

createConnection({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Passwords],
  synchronize: true,
})
  .then(() => {
    // here you can start to work with your entities
  })
  .catch((error) => console.log(error));

app.use('/', password);
app.use('/auth', auth);

app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: 'Running',
  });
});
app.listen(process.env.PORT || 4000, () => {
  console.log('running');
});
