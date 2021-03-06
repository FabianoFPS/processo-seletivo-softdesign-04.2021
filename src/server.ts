import express from 'express';

import './typeorm';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);
app.listen(3333, () => console.info('Server start on port 3333'));
