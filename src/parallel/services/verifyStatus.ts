import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import { IShippedRepository } from '../../modules/product/repositories/IShippedProducts';
import { ShippedProductsRepositoryInMemory } from '../../modules/product/repositories/shippedProductsRepositoryInMemory';
import { transporters as transportCompanies } from '../mailOperations';

@injectable()
class VerifyStatus {
  constructor(
    @inject('ShippedProductsRepository')
    private repo: IShippedRepository,
  ) {}

  async execute(): Promise<void> {
    const products = await this.repo.listAllPending();

    products.forEach(async (product) => {
      const company = product.sended_by as keyof typeof transportCompanies;
      const status = await transportCompanies[company].getPackageInfo(product.transporter_code, 'LS');
      // request to analyze the status and warn the user
    });
  }
}

export { VerifyStatus };
