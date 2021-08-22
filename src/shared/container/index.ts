import { container } from 'tsyringe';

import { ITokensRepository } from '../../modules/auth/repositories/ITokensRepository';
import { TokensRepository } from '../../modules/auth/repositories/tokensRepository';
import { IPlansRepository } from '../../modules/plan/repositories/IPlansRepository';
import { PlansRepository } from '../../modules/plan/repositories/plansRepository';
import { IShippedRepository } from '../../modules/shippedProduct/repositories/IShippedProducts';
import { ShippedProductsRepository } from '../../modules/shippedProduct/repositories/shippedProductsRepository';
import { ITransportersRepository } from '../../modules/transporter/repositories/ITransportersRepository';
import { TransportersRepository } from '../../modules/transporter/repositories/TransportersRepository';
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

container.registerSingleton<ITransportersRepository>(
  'TransportersRepository',
  TransportersRepository,
);
