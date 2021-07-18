import { Request, Response } from 'express';

import { CreatePlanUseCase } from './createPlanUseCase';

class CreatePlanController {
  constructor(private createPlanUseCase: CreatePlanUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, price } = req.body;

    const newPlan = await this.createPlanUseCase.execute({ name, price });

    return res.status(201).json(newPlan);
  }
}

export { CreatePlanController };
