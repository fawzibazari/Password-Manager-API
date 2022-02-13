import express, { Application, Request, Response } from 'express';

import { createConnection } from 'typeorm';
import cors from 'cors';

const app: Application = express();

app.use(cors());
app.use(express.json());

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'password_manager',
  entities: [__dirname + '/src/models/*.ts'],
  synchronize: true,
})
  .then(() => {
    // here you can start to work with your entities
  })
  .catch((error) => console.log(error));

app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: 'Running',
  });
});
app.listen(4000, () => {
  console.log('running on http://localhost:4000/');
});
