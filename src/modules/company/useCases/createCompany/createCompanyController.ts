import { Request, Response } from 'express';

import { CreateCompanyUseCase } from './createCompanyUseCase';

class CreateCompanyController {
  constructor(private createCompanyUseCase: CreateCompanyUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name, fantasy_name, phone, email, adress, cnpj,
    } = req.body;

    const { plan_id } = req.params;

    const newCompany = await this.createCompanyUseCase.execute({
      name, fantasy_name, phone, email, adress, cnpj, plan_id,
    });

    return res.status(201).json(newCompany);
  }
}

export { CreateCompanyController };
