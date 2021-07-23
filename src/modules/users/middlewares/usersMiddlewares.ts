import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';

import { UsersRepository } from '../repositories/usersRepository';

async function checkIfUserIsAdmin(
  req: Request, res: Response, next: NextFunction,
): Promise<Response | void> {
  const { user_id } = req.body;

  const repo = getCustomRepository(UsersRepository);

  const user = await repo.findOne({ id: user_id });
  if (!user?.admin) {
    return res.status(400).json({ error: 'user trying to change the role is not an admin' });
  }

  return next();
}

async function checkIfUserExists(
  req: Request, res: Response, next: NextFunction,
): Promise<Response | void> {
  const { user_id } = req.body;

  if (!validate(user_id)) {
    return res.status(400).json({ error: 'id not valid' });
  }
  const repo = getCustomRepository(UsersRepository);

  const user = await repo.findOne({ id: user_id });
  if (!user) {
    return res.status(404).json({ error: 'user not found' });
  }

  return next();
}

export { checkIfUserIsAdmin, checkIfUserExists };
