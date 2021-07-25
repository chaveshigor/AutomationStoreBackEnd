import { inject, injectable } from 'tsyringe';

import { Product } from '../../../../models/Product';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { IProducsRepository } from '../../repositories/IProductsRepository';

interface IUserInfo {
  company_id: string
}

interface IRequestCreateProduct {
  name: string
  price: number
  description?: string
}

@injectable()
class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private repo: IProducsRepository,

  ) {}

  async execute({
    name, price, description,
  }: IRequestCreateProduct, { company_id }: IUserInfo): Promise<Product> {
    const { repo } = this;

    const product = await repo.findOne({ name, company_id });
    if (product) {
      throw new ErrorHandler('product already exists', 400);
    }

    const newProduct = repo.create({
      name,
      price,
      description,
      company_id,
    });

    return newProduct;
  }
}

export { CreateProductUseCase };
