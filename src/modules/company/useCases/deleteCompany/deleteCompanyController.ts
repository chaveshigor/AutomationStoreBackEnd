import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteCompanyUseCase } from './deleteCompanyUseCase';

class DeleteCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { cnpj } = req.body;
    const deleteCompanyUseCase = container.resolve(DeleteCompanyUseCase);
    await deleteCompanyUseCase.execute(cnpj);

    return res.send();
  }
}

export { DeleteCompanyController };
