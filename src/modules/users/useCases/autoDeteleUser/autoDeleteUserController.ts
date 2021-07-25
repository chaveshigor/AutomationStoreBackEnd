import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AutoDeleteUserUseCase } from './autoDeleteUserUseCase';

class AutoDeleteUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user } = req;
    const autoDeleteUseCase = container.resolve(AutoDeleteUserUseCase);

    await autoDeleteUseCase.execute(user.id);

    return res.status(200).send();
  }
}

export { AutoDeleteUserController };
