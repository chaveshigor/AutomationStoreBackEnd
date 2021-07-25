import { inject, injectable } from 'tsyringe';

import { Product } from '../../../../models/Product';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { IProducsRepository, IUpdate } from '../../repositories/IProductsRepository';

@injectable()
class UpdateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private repo: IProducsRepository,
  ) {}

  async execute(
    product_id: string, { name, price, description }: IUpdate, company_id: string,
  ): Promise<Product> {
    const { repo } = this;

    const product = await repo.findOne({ id: product_id, company_id });
    if (!product) {
      throw new ErrorHandler('product not found', 404);
    }

    const product_edited = await repo.updateById(product_id, {
      name, description, price,
    });

    return product_edited;
  }
}

export { UpdateProductUseCase };
