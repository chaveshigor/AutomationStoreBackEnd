import { genSalt, hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { User } from '../../../../models/User';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { IRequestCreateUser } from '../../interfaces';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private repo: IUsersRepository,
  ) {}

  async execute({
    first_name, last_name, email, password, plan_id,
  }: IRequestCreateUser): Promise<User> {
    const { repo } = this;

    const checkIfUserExists = await repo.findOne({ email });
    if (checkIfUserExists) {
      throw new ErrorHandler('user already exists', 400);
    }

    const salt = await genSalt(8);
    const passwordHash = await hash(password, salt);

    const newUser = repo.create({
      first_name, last_name, email, password: passwordHash, plan_id,
    });

    return newUser;
  }
}

export { CreateUserUseCase };
