import { Request, Response } from 'express';

import { DeleteCompanyUseCase } from './deleteCompanyUseCase';

class DeleteCompanyController {
  constructor(private deleteCompanyUseCase: DeleteCompanyUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { cnpj } = req.body;

    await this.deleteCompanyUseCase.execute(cnpj);

    return res.send();
  }
}

export { DeleteCompanyController };
