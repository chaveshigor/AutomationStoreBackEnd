import { inject, injectable } from 'tsyringe';

import { ShippedProduct } from '../../../../models/ShippedProduct';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { IShippedRepository } from '../../repositories/IShippedProducts';

@injectable()
class CreateProductUseCase {
  constructor(
    @inject('ShippedProductsRepository')
    private repo: IShippedRepository,

  ) {}

  async execute({
    name, mail_code, purchase_date, transporter_id, user_id,
  }: ShippedProduct): Promise<ShippedProduct> {
    const { repo } = this;

    const product = await repo.findByMailCode(mail_code);
    if (product) {
      throw new ErrorHandler('product already exists', 400);
    }

    const newProduct = repo.create({
      name, user_id, mail_code, purchase_date, transporter_id,
    });

    return newProduct;
  }
}

export { CreateProductUseCase };
