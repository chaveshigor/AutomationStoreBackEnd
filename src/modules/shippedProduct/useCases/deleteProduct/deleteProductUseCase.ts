import { inject, injectable } from 'tsyringe';

import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { IShippedRepository } from '../../repositories/IShippedProducts';

@injectable()
class DeleteProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepo: IShippedRepository,
  ) {}

  async execute(product_id: string, user_id: string): Promise<void> {
    const { productsRepo } = this;

    const product = await productsRepo.findById(product_id);
    if (!product) {
      throw new ErrorHandler('product not found', 404);
    }

    if (user_id === product.user_id) {
      await productsRepo.deleteProductById(product_id);
    } else {
      throw new ErrorHandler('product dont belongs to user', 404);
    }
  }
}

export { DeleteProductUseCase };
