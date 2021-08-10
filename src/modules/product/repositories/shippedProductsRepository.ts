import { getRepository, Repository } from 'typeorm';

import { ShippedProduct } from '../../../models/ShippedProduct';
import { IShippedRepository } from './IShippedProducts';

class ShippedProductsRepository implements IShippedRepository {
    private repo: Repository<ShippedProduct>
    constructor() {
      this.repo = getRepository(ShippedProduct);
    }
    async listAllPending(): Promise<ShippedProduct[]> {
      const products = await this.repo.find();

      return products;
    }

    async findByTransporterCode(transporter_code: string): Promise<ShippedProduct | undefined> {
      const product = this.repo.findOne({ transporter_code });

      return product;
    }

    async create({
      product_name, sended_by, sended_date, status, transporter_code,
    }: ShippedProduct): Promise<ShippedProduct> {
      const newProductToShip = this.repo.create({
        product_name, sended_by, sended_date, status, transporter_code,
      });
      await this.repo.save(newProductToShip);

      return newProductToShip;
    }

    async updateStatus(id: string, status: string): Promise<void> {
      await this.repo.update(id, {
        status,
      });
    }

    async updateProduct(id: string, productData: ShippedProduct): Promise<ShippedProduct> {
      await this.repo.update(id, productData);
      const product = await this.repo.findOne(id) as ShippedProduct;

      return product;
    }
}

export { ShippedProductsRepository };
