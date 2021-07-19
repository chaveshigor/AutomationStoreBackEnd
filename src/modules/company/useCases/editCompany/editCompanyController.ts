import { Request, Response } from 'express';

import { EditCompanyUseCase } from './editCompanyUseCase';

class EditCompanyController {
  constructor(private editCompanyUseCase: EditCompanyUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name, fantasy_name, email, phone, adress, cnpj,
    } = req.body;

    const company = await this.editCompanyUseCase.execute({
      name, email, fantasy_name, phone, adress, cnpj,
    });

    return res.json(company);
  }
}

export { EditCompanyController };
