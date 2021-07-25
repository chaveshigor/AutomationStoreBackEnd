import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProductsFromCompanyUseCase } from './listProducsFromCompanyUseCase';

class ListProductsFromCompanyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { company_id } = req.body;

    const listProductsFromCompanyUseCase = container.resolve(ListProductsFromCompanyUseCase);
    const products = await listProductsFromCompanyUseCase.execute(company_id);

    return res.status(200).json(products);
  }
}

export { ListProductsFromCompanyController };
