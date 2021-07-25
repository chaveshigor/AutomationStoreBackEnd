import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListPlansUseCase } from './listPlansUseCase';

class ListPlansController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listPlansUseCase = container.resolve(ListPlansUseCase);
    const plans = await listPlansUseCase.execute();

    return res.status(200).json(plans);
  }
}

export { ListPlansController };
