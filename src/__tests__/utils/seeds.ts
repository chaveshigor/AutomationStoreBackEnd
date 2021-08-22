import { hash } from 'bcrypt';

import { Plan } from '../../models/Plan';
import { Transporter } from '../../models/Transporter';
import { User } from '../../models/User';
import { IPlansRepository } from '../../modules/plan/repositories/IPlansRepository';
import { ITransportersRepository } from '../../modules/transporter/repositories/ITransportersRepository';
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

const transporterSeed = async (
  repo: ITransportersRepository,
  name: string,
  create = false,
): Promise<Transporter> => {
  const transporter = {
    name,
  };

  if (create) {
    const response = await repo.create(name);
    return response;
  }

  return transporter;
};

export { planSeed, userSeed, transporterSeed };
