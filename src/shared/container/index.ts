import { container } from 'tsyringe';

import { CompaniesRepository } from '../../modules/company/repositories/companiesRepository';
import { ICompaniesRepository } from '../../modules/company/repositories/ICompaniesRepository';
import { IPlansRepository } from '../../modules/plan/repositories/IPlansRepository';
import { PlansRepository } from '../../modules/plan/repositories/plansRepository';
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
