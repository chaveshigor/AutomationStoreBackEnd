import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTransporterUseCase } from './createTransporterUseCase';

class CreateTransporterController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createTransporterUseCase = container.resolve(CreateTransporterUseCase);
    const transporter = await createTransporterUseCase.execute(name);

    return res.status(201).json(transporter);
  }
}

export { CreateTransporterController };
