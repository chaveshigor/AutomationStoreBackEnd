import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthUserUseCase } from './authUserUseCase';

class AuthUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authUserUseCase = container.resolve(AuthUserUseCase);
    const user = await authUserUseCase.execute({ email, password });

    return res.json(user);
  }
}

export { AuthUserController };
