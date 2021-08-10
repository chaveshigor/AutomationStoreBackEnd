import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShipNewProductUseCase } from './ShipNewProductUseCase';

class ShipNewProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      status, product_name, sended_by, sended_date, transporter_code,
    } = req.body;

    const shipNewProductUseCase = container.resolve(ShipNewProductUseCase);
    const newProduct = await shipNewProductUseCase.execute({
      status, product_name, sended_by, sended_date, transporter_code,
    });

    return res.status(201).json(newProduct);
  }
}

export { ShipNewProductController };
