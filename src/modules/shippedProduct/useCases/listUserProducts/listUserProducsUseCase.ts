import { inject, injectable } from 'tsyringe';

import { ShippedProduct } from '../../../../models/ShippedProduct';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { IShippedRepository } from '../../repositories/IShippedProducts';

@injectable()
class ListUserProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepo: IShippedRepository,
    @inject('UsersRepository')
    private usersRepo: IUsersRepository,
  ) {}

  async execute(user_id: string): Promise<ShippedProduct[]> {
    const { productsRepo, usersRepo } = this;

    const user = await usersRepo.findOne({ id: user_id });
    if (!user) {
      throw new ErrorHandler('user not found', 404);
    }

    const products = await productsRepo.findAllByUser(user_id);

    return products;
  }
}

export { ListUserProductsUseCase };
