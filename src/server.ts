import 'reflect-metadata';
import express from 'express';

// Importing the routes
import { routes } from './routes/index.routes';

const app = express();

app.use(routes);

export { app };
