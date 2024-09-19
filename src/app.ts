import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';
//import { StudentRoute } from './app/modules/student/student.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

// Application route
//app.use('/api/v1/students', StudentRoute);
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});


export default app;
