import { inject, injectable } from 'tsyringe';

import { ShippedProduct } from '../../../../models/ShippedProduct';
import { IShippedRepository } from '../../repositories/IShippedProducts';

@injectable()
class ShipNewProductUseCase {
  constructor(
        @inject('ShippedProductsRepository')
        private repo: IShippedRepository,
  ) {}

  async execute({
    status, sended_date, sended_by, product_name, transporter_code,
  }: ShippedProduct): Promise<ShippedProduct> {
    const newProductToShip = await this.repo.create({
      status, sended_date, sended_by, product_name, transporter_code,
    });

    return newProductToShip;
  }
}
export { ShipNewProductUseCase };
