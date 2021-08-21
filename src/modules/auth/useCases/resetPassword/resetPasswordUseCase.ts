import { genSalt, hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { ITokensRepository } from '../../repositories/ITokensRepository';

interface IRequestResetPassword{
    token: string
    email: string
    new_password: string
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('TokensRepository')
    private tokensRepo: ITokensRepository,

    @inject('UsersRepository')
    private usersRepo: IUsersRepository,
  ) {}

  async execute({ email, token, new_password }: IRequestResetPassword): Promise<void> {
    const user = await this.usersRepo.findOne({ email });
    if (!user) {
      throw new ErrorHandler('user not founded', 404);
    }

    const current_token = await this.tokensRepo.findByUserId(user.id as string);
    if (!current_token) {
      throw new ErrorHandler('unalthorized', 401);
    }

    // Check if the token are right
    if (current_token.token !== token) {
      throw new ErrorHandler('unalthorized', 401);
    }

    // Check if token has expired
    if (current_token.expire_at < new Date()) {
      throw new ErrorHandler('token expired', 401);
    }

    const salt = await genSalt(8);
    const passwordHash = await hash(new_password, salt);
    await this.usersRepo.updatePassword(user.id as string, passwordHash);
  }
}

export { ResetPasswordUseCase };
