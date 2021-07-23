import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePlanUseCase } from './createPlanUseCase';

class CreatePlanController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, price } = req.body;
    const createPlanUseCase = container.resolve(CreatePlanUseCase);
    const newPlan = await createPlanUseCase.execute({ name, price });

    return res.status(201).json(newPlan);
  }
}

export { CreatePlanController };
