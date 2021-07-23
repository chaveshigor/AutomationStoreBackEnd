import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCompanyUseCase } from './createCompanyUseCase';

class CreateCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name, fantasy_name, phone, email, adress, cnpj,
    } = req.body;

    const { plan_id } = req.params;

    const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

    const newCompany = await createCompanyUseCase.execute({
      name, fantasy_name, phone, email, adress, CNPJ: cnpj, plan_id,
    });

    return res.status(201).json(newCompany);
  }
}

export { CreateCompanyController };
