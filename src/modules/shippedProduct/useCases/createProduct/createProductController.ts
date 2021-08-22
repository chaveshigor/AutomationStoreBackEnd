import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductUseCase } from './createProductUseCase';

class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name, mail_code, purchase_date, transporter_id,
    } = req.body;
    const { id: user_id } = req.user;

    const createProductUseCase = container.resolve(CreateProductUseCase);
    const newProduct = await createProductUseCase.execute({
      name, mail_code, purchase_date, transporter_id, user_id,
    });

    return res.status(201).json(newProduct);
  }
}

export { CreateProductController };
