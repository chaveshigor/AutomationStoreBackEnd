import { container } from 'tsyringe';

import { ITokensRepository } from '../../modules/auth/repositories/ITokensRepository';
import { TokensRepository } from '../../modules/auth/repositories/tokensRepository';
import { ClientsRepository } from '../../modules/client/repositories/clientsRepository';
import { IClientsRepository } from '../../modules/client/repositories/IClientsRepository';
import { CompaniesRepository } from '../../modules/company/repositories/companiesRepository';
import { ICompaniesRepository } from '../../modules/company/repositories/ICompaniesRepository';
import { IPlansRepository } from '../../modules/plan/repositories/IPlansRepository';
import { PlansRepository } from '../../modules/plan/repositories/plansRepository';
import { IProducsRepository } from '../../modules/product/repositories/IProductsRepository';
import { IShippedRepository } from '../../modules/product/repositories/IShippedProducts';
import { ProductsRepository } from '../../modules/product/repositories/productsRepository';
import { ShippedProductsRepository } from '../../modules/product/repositories/shippedProductsRepository';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/users/repositories/usersRepository';

container.registerSingleton<IPlansRepository>(
  'PlansRepository',
  PlansRepository,
);

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITokensRepository>(
  'TokensRepository',
  TokensRepository,
);

container.registerSingleton<IProducsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<IShippedRepository>(
  'ShippedProductsRepository',
  ShippedProductsRepository,
);
