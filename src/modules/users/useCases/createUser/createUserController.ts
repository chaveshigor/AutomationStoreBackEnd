import { Request, Response } from 'express';

import { CreateUserUseCase } from './createUserUseCase';

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const {
      first_name, last_name, email, password, admin, company_id,
    } = req.body;

    const newUser = await this.createUserUseCase.execute({
      first_name, last_name, email, password, admin, company_id,
    });

    return res.status(201).json(newUser);
  }
}

export { CreateUserController };
