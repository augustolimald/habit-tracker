import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import { resolve } from 'path';

import routes from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api', routes);
app.use('/', express.static(resolve(__dirname, 'app', 'views')));

export default app;
