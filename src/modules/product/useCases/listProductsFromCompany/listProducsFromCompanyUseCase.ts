import { inject, injectable } from 'tsyringe';

import { Product } from '../../../../models/Product';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { IProducsRepository } from '../../repositories/IProductsRepository';

@injectable()
class ListProductsFromCompanyUseCase {
  constructor(
    @inject('ProductsRepository')
    private repo: IProducsRepository,
  ) {}

  async execute(company_id: string): Promise<Product[]> {
    const { repo } = this;

    const products = await repo.findAllByCompanyId(company_id);

    if (!products) {
      throw new ErrorHandler('products not found', 404);
    }

    return products;
  }
}

export { ListProductsFromCompanyUseCase };
