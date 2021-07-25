import { NextFunction, Request, Response } from 'express';

async function checkIfUserIsAdmin(
  req: Request, res: Response, next: NextFunction,
): Promise<Response | void> {
  const { admin } = req.user;

  if (!admin) {
    return res.status(400).json({ error: 'user trying to change the role is not an admin' });
  }

  return next();
}

export { checkIfUserIsAdmin };
