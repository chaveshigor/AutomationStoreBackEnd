import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductUseCase } from './createProductUseCase';

class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, price, description } = req.body;
    const { company_id } = req.user;

    const createProductUseCase = container.resolve(CreateProductUseCase);
    const newProduct = await createProductUseCase.execute({
      name, price, description,
    }, { company_id });

    return res.status(201).json(newProduct);
  }
}

export { CreateProductController };
