import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteProductUseCase } from './deleteProductUseCase';

class DeleteProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { product_id } = req.body;
    const { user: { id: user_id } } = req;
    const deleteProductUseCase = container.resolve(DeleteProductUseCase);
    await deleteProductUseCase.execute(product_id, user_id);

    return res.status(200).send();
  }
}

export { DeleteProductController };
