import { getRepository, Repository } from 'typeorm';

import { ShippedProduct } from '../../../models/ShippedProduct';
import { IShippedRepository } from './IShippedProducts';

class ShippedProductsRepository implements IShippedRepository {
    private repo: Repository<ShippedProduct>
    constructor() {
      this.repo = getRepository(ShippedProduct);
    }

    async create({
      name, purchase_date, mail_code, user_id, transporter_id,
    }: ShippedProduct): Promise<ShippedProduct> {
      const newProductToShip = this.repo.create({
        name, purchase_date, mail_code, user_id, transporter_id,
      });
      await this.repo.save(newProductToShip);

      return newProductToShip;
    }

    async findByMailCode(mail_code: string): Promise<ShippedProduct | undefined> {
      const product = await this.repo.findOne({ where: { mail_code } });

      return product;
    }

    async findById(product_id: string): Promise<ShippedProduct | undefined> {
      const product = await this.repo.findOne(product_id);

      return product;
    }

    async findAllByUser(user_id: string): Promise<ShippedProduct[]> {
      const products = await this.repo.find({ where: { user_id } });

      return products;
    }

    async updateProductName(product_id: string, new_name: string): Promise<ShippedProduct> {
      await this.repo.update(product_id, {
        name: new_name,
      });
      const product = await this.repo.findOne(product_id) as ShippedProduct;

      return product;
    }

    async updateProductMailCode(product_id: string, new_code: string): Promise<ShippedProduct> {
      await this.repo.update(product_id, {
        mail_code: new_code,
      });
      const product = await this.repo.findOne(product_id) as ShippedProduct;

      return product;
    }

    async deleteProductById(product_id: string): Promise<void> {
      await this.repo.delete(product_id);
    }
}

export { ShippedProductsRepository };
