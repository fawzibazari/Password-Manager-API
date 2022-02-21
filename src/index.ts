import express, { Application, Request, Response } from 'express';
import { createConnection } from 'typeorm';
import cors from 'cors';
import { password } from './routes/password';
import { auth } from './routes/auth';
import passport from 'passport';
import passportMiddleware from './middlewares/jwt';
import { User } from './models/User';
import { Passwords } from './models/Passwords';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

createConnection({
  type: 'postgres',
  host: 'abul.db.elephantsql.com',
  port: 5432,
  username: 'jcpicevq',
  password: 'aRP0z7fNSSxKINiyml-SM1Y8HrgQYGKr',
  database: 'jcpicevq',
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
