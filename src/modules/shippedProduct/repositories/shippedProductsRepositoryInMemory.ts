import { ShippedProduct } from '../../../models/ShippedProduct';
import { IShippedRepository } from './IShippedProducts';

class ShippedProductsRepositoryInMemory implements IShippedRepository {
    private repo: ShippedProduct[]
    constructor() {
      this.repo = [];
    }

    async create({
      name, transporter_id, user_id, mail_code, purchase_date,
    }: ShippedProduct): Promise<ShippedProduct> {
      const product = new ShippedProduct();
      Object.assign(product, {
        name, transporter_id, user_id, purchase_date, mail_code,
      });
      this.repo.push(product);

      return product;
    }

    async findByMailCode(mail_code: string): Promise<ShippedProduct | undefined> {
      return this.repo.find((product) => product.mail_code === mail_code);
    }

    async findById(product_id: string): Promise<ShippedProduct | undefined> {
      return this.repo.find((product) => product.id === product_id);
    }

    async findAllByUser(user_id: string): Promise<ShippedProduct[]> {
      return this.repo.filter((product) => {
        if (product.user_id === user_id) {
          return product;
        }
        return undefined;
      });
    }

    async updateProductName(product_id: string, new_name: string): Promise<ShippedProduct> {
      const product = this.repo.find((product) => product.id === product_id) as ShippedProduct;
      const index = this.repo.indexOf(product);

      Object.assign(this.repo[index], {
        name: new_name,
      });

      return this.repo[index];
    }

    async updateProductMailCode(product_id: string, new_code: string): Promise<ShippedProduct> {
      const product = this.repo.find((product) => product.id === product_id) as ShippedProduct;
      const index = this.repo.indexOf(product);

      Object.assign(this.repo[index], {
        mail_code: new_code,
      });

      return this.repo[index];
    }

    async deleteProductById(product_id: string): Promise<void> {
      const product = this.repo.find((product) => product.id === product_id) as ShippedProduct;
      const index = this.repo.indexOf(product);

      this.repo.splice(index, 1);
    }
}

export { ShippedProductsRepositoryInMemory };
