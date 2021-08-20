import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/users/repositories/usersRepository';

interface IPayload {
    sub: string
}

async function ensureAuth(
  req: Request, res: Response, next: NextFunction,
): Promise<void | Response> {
  const { authorization } = req.headers;

  const token = authorization?.split(' ')[1] as string;

  // verificar se token é valido
  const secret = process.env.APP_SECRET as string;
  try {
    const { sub: user_id } = verify(token, secret) as IPayload;
    const repo = new UsersRepository();

    // verificar se user existe
    const user = await repo.findOne({ id: user_id });
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    // colocar dados do user na request
    req.user = {
      id: user_id,
      plan: user.plan_id,
    };
  } catch (error) {
    return res.status(401).json({ error: 'invalid token' });
  }

  return next();
}

export { ensureAuth };
