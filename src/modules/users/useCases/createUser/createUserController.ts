import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './createUserUseCase';

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      first_name, last_name, email, password, plan_id,
    } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const newUser = await createUserUseCase.execute({
      first_name, last_name, email, password, plan_id,
    });

    return res.status(201).json(newUser);
  }
}

export { CreateUserController };
