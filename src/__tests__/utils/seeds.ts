import { hash } from 'bcrypt';

import { Plan } from '../../models/Plan';
import { User } from '../../models/User';
import { IPlansRepository } from '../../modules/plan/repositories/IPlansRepository';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';

const planSeed = async (repo: IPlansRepository, create = false): Promise<Plan> => {
  const plan = {
    name: 'T-800',
    price: 50,
  };

  if (create) {
    const response = await repo.create(plan);
    return response;
  }

  return plan;
};

const userSeed = async (repo: IUsersRepository, plan_id: string, create = false): Promise<User> => {
  const passwordHash = await hash('123456', 8);

  const user: User = {
    first_name: 'higor',
    last_name: 'chaves',
    email: 'higorchaves@gmail.com',
    password: passwordHash,
    plan_id,
  };

  if (create) {
    const response = await repo.create(user);
    return response;
  }

  return user;
};

export { planSeed, userSeed };
