import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateClientUseCase } from './createClientUseCase';

class CreateClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { company_id } = req.user;
    const {
      last_name, phone, cpf, email, first_name,
    } = req.body;

    const createClientUseCase = container.resolve(CreateClientUseCase);
    const client = await createClientUseCase.execute({
      last_name, phone, cpf, email, first_name, company_id,
    });

    return res.status(201).json(client);
  }
}

export { CreateClientController };
