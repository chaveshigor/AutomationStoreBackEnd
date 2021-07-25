import { inject, injectable } from 'tsyringe';

import { User } from '../../../../models/User';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { IProducsRepository } from '../../repositories/IProductsRepository';

interface IUserInfo {
  company_id: string
  user_id: string
}

@injectable()
class DeleteProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepo: IProducsRepository,

    @inject('UsersRepository')
    private usersRepo: IUsersRepository,
  ) {}

  async execute(product_id: string, { user_id, company_id }: IUserInfo): Promise<void> {
    const { productsRepo, usersRepo } = this;

    // Check if the user belongs to the company
    const user = await usersRepo.findOne({ id: user_id }) as User;
    console.log(user.company_id, company_id);
    if (user.company_id !== company_id) {
      throw new ErrorHandler('user not belongs to the company', 401);
    }

    const product = await productsRepo.findOne({ id: product_id });
    if (!product) {
      throw new ErrorHandler('product not found', 404);
    }

    await productsRepo.deleteById(product_id);
  }
}

export { DeleteProductUseCase };
