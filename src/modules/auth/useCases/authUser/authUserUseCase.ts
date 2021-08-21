import 'reflect-metadata';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { User } from '../../../../models/User';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { IRequestAuth } from '../../interface';

interface IUserReturn {
  user: {
    id: string,
    first_name: string
    last_name: string
    email: string
  }
  token: string
}

@injectable()
class AuthUserUseCase {
  constructor(
    @inject('UsersRepository')
    private repo: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequestAuth): Promise<IUserReturn | undefined> {
    const { repo } = this;

    const user = await repo.findOne({ email });
    if (!user) {
      throw new ErrorHandler('wrong email or password', 400);
    }

    const { password: passwordHash } = user;

    const checkPassword = await compare(password, passwordHash);
    if (!checkPassword) {
      throw new ErrorHandler('wrong email or password', 400);
    }

    const secret = process.env.APP_SECRET as string || 'secret';
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: '1d',
    });

    const userToReturn = {
      user: {
        id: user.id as string,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      token,
    };
    return userToReturn;
  }
}

export { AuthUserUseCase };
