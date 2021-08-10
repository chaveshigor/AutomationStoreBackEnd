import { getRepository, Repository } from 'typeorm';

import { ShippedProduct } from '../../../models/ShippedProduct';
import { IShippedRepository } from './IShippedProducts';

class ShippedProductsRepositoryInMemory implements IShippedRepository {
    private repo: ShippedProduct[]
    constructor() {
      this.repo = [];
    }

    async listAllPending(): Promise<ShippedProduct[]> {
      return this.repo;
    }

    async findByTransporterCode(transporter_code: string): Promise<ShippedProduct | undefined> {
      return this.repo.find((product) => product.transporter_code === transporter_code);
    }

    async create({
      product_name, sended_by, sended_date, status, transporter_code,
    }: ShippedProduct): Promise<ShippedProduct> {
      const product = new ShippedProduct();
      Object.assign(product, {
        product_name, sended_by, sended_date, status, transporter_code,
      });
      this.repo.push(product);

      return product;
    }

    async updateStatus(id: string, status: string): Promise<void> {
      const product = this.repo.find((pro) => pro.id === id) as ShippedProduct;
      const index = this.repo.indexOf(product);
      this.repo[index].status = status;
    }

    async updateProduct(id: string, productData: ShippedProduct): Promise<ShippedProduct> {
      const product = this.repo.find((pro) => pro.id === id) as ShippedProduct;
      const index = this.repo.indexOf(product);
      Object.assign(this.repo[index], productData);

      return this.repo[index];
    }
}

export { ShippedProductsRepositoryInMemory };
