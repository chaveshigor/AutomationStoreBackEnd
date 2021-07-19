import { getCustomRepository } from 'typeorm';

import { User } from '../../../../models/User';
import { IRequestCreateUser } from '../../interfaces';
import { UsersRepository } from '../../repositories/usersRepository';

class CreateUserUseCase {
  async execute({
    first_name, last_name, email, password, admin, company_id,
  }: IRequestCreateUser): Promise<User> {
    const repo = getCustomRepository(UsersRepository);

    const newUser = repo.create({
      first_name, last_name, email, password, admin, company_id,
    });

    return newUser;
  }
}

export { CreateUserUseCase };
