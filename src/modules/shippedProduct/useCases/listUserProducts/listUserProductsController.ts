import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProductsFromCompanyUseCase } from './listUserProducsUseCase';

class ListUserProductsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user: { id: user_id } } = req;

    const listProductsFromCompanyUseCase = container.resolve(ListProductsFromCompanyUseCase);
    const products = await listProductsFromCompanyUseCase.execute(user_id);

    return res.status(200).json(products);
  }
}

export { ListUserProductsController };
