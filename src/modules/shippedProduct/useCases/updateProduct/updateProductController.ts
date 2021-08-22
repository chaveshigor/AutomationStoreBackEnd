import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateProductUseCase } from './updateProductUseCase';

class UpdateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      product_id, name, price, description,
    } = req.body;
    const { company_id } = req.user;

    const updateProductUseCase = container.resolve(UpdateProductUseCase);
    const product = await updateProductUseCase.execute(
      product_id, { name, price, description }, company_id,
    );

    return res.status(200).json(product);
  }
}

export { UpdateProductController };
