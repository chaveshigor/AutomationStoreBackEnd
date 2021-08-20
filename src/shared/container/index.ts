import { container } from 'tsyringe';

import { ITokensRepository } from '../../modules/auth/repositories/ITokensRepository';
import { TokensRepository } from '../../modules/auth/repositories/tokensRepository';
import { IPlansRepository } from '../../modules/plan/repositories/IPlansRepository';
import { PlansRepository } from '../../modules/plan/repositories/plansRepository';
import { IShippedRepository } from '../../modules/product/repositories/IShippedProducts';
import { ShippedProductsRepository } from '../../modules/product/repositories/shippedProductsRepository';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/users/repositories/usersRepository';

container.registerSingleton<IPlansRepository>(
  'PlansRepository',
  PlansRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITokensRepository>(
  'TokensRepository',
  TokensRepository,
);

container.registerSingleton<IShippedRepository>(
  'ShippedProductsRepository',
  ShippedProductsRepository,
);
