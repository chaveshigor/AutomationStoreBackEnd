import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ChangePlanUseCase } from './changePlanUseCase';

class ChangePlanController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { plan_id } = req.params;
    const { cnpj } = req.body;
    const changePlanUseCase = container.resolve(ChangePlanUseCase);
    const company = await changePlanUseCase.execute({ cnpj, plan_id });

    return res.json(company);
  }
}

export { ChangePlanController };
