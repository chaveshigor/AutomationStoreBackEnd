import { getRepository, Repository } from 'typeorm';

import { Product } from '../../../models/Product';
import { IRequestCreateProduct } from '../interfaces';
import { IParams, IProducsRepository, IUpdate } from './IProductsRepository';

class ProductsRepository implements IProducsRepository {
    private repo: Repository<Product>
    constructor() {
      this.repo = getRepository(Product);
    }

    async findAllByCompanyId(company_id: string): Promise<Product[]> {
      const product = await this.repo.find({ where: { company_id } });

      return product;
    }

    async findOne(params: IParams): Promise<Product | undefined> {
      const product = await this.repo.findOne({ where: params });

      return product;
    }

    async create({
      company_id, name, price, description,
    }: IRequestCreateProduct): Promise<Product> {
      const newProduct = await this.repo.create({
        company_id,
        name,
        price,
        description,
      });
      await this.repo.save(newProduct);

      return newProduct;
    }

    async updateById(id: string, productData: IUpdate): Promise<Product> {
      await this.repo.update({ id }, productData);
      const product = await this.repo.findOne(id) as Product;

      return product;
    }

    async deleteById(id: string): Promise<void> {
      await this.repo.delete({ id });
    }
}

export { ProductsRepository };
