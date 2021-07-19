import { Request, Response } from 'express';

import { ChangePlanUseCase } from './changePlanUseCase';

class ChangePlanController {
  constructor(private changePlanUseCase: ChangePlanUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { plan_id } = req.params;
    const { cnpj } = req.body;
    const company = await this.changePlanUseCase.execute({ cnpj, plan_id });

    return res.json(company);
  }
}

export { ChangePlanController };
