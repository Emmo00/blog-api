import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes/index';

const app = express();

app.use(helmet());
app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', router);

app.get('/', (_, res) => {
  res.send('Hello World!');
});

export default app;
