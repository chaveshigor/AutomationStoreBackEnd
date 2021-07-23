import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EditCompanyUseCase } from './editCompanyUseCase';

class EditCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name, fantasy_name, email, phone, adress, cnpj,
    } = req.body;
    const editCompanyUseCase = container.resolve(EditCompanyUseCase);

    const company = await editCompanyUseCase.execute({
      name, email, fantasy_name, phone, adress, cnpj,
    });

    return res.json(company);
  }
}

export { EditCompanyController };
