import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { User } from '../../../../models/User';
import { readHtml, sendEmail } from '../../../../shared/email/emailFunctions';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { ITokensRepository } from '../../repositories/ITokensRepository';

@injectable()
class SendEmailToResetPasswordUseCase {
  constructor(
    @inject('TokensRepository')
    private tokensRepo: ITokensRepository,

    @inject('UsersRepository')
    private usersRepo: IUsersRepository,
  ) {}

  async execute(email: string): Promise<string> {
    const user = await this.usersRepo.findOne({ email }) as User;

    if (!user) {
      throw new ErrorHandler('user not found', 404);
    }

    function sumHoursToDate(hours: number):Date {
      const currentTime = new Date();
      const expiration_time = new Date(currentTime.setHours(currentTime.getHours() + hours));

      return expiration_time;
    }

    const currentToken = await this.tokensRepo.findByUserId(user.id as string);
    if (currentToken) {
      await this.tokensRepo.deleteByUserId(user.id as string);
    }

    const randomNumber = Math.random().toString();
    const tokenHash = await hash(randomNumber, 10);

    const newToken = await this.tokensRepo.create(user.id as string, tokenHash, sumHoursToDate(3));

    const first_name_to_email = user.first_name[0].toUpperCase() + user.first_name.substr(1);

    const html = readHtml('src/modules/auth/email/resetPassword.html', {
      first_name: first_name_to_email,
      link: `localhost:${process.env.APP_PORT}/${newToken.token}`,
    });

    sendEmail(html, user.email, `Olá ${first_name_to_email}! Redefina sua senha`);

    return newToken.token;
  }
}

export { SendEmailToResetPasswordUseCase };
