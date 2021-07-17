import 'reflect-metadata';
import express from 'express';

// Importing the db connection mananger
import { connectionMananger } from './database/connection';
// Importing the routes
import { routes } from './routes/index.routes';

connectionMananger().connect();

const app = express();

app.use(routes);

export { app };
