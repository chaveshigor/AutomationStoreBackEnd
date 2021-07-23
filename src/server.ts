import 'reflect-metadata';
import 'express-async-errors';
import './shared/container';

import express, { NextFunction, Request, Response } from 'express';

// Importing the db connection mananger
import { connectionMananger } from './database/connection';
// Importing the routes
import { ErrorHandler } from './ErrorHandler';
import { routes } from './routes/index.routes';

connectionMananger().connect();

const app = express();

app.use(express.json());
app.use(routes);

// Error middleware
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.status).json({
      error: err.message,
    });
  }

  return res.status(400).json({
    error: 'unknowed error',
  });
});

export { app };
