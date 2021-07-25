import { inject, injectable } from 'tsyringe';

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

  async execute(email: string): Promise<void> {
    const user = await this.usersRepo.findOne({ email });
    if (!user) {
      throw new ErrorHandler('user not found', 404);
    }

    const currentToken = await this.tokensRepo.findByUserId(user.id);
    if (currentToken) {
      await this.tokensRepo.deleteByUserId(user.id);
    }

    const newToken = await this.tokensRepo.create(user.id);

    const first_name_to_email = user.first_name[0].toUpperCase() + user.first_name.substr(1);

    const html = readHtml('src/modules/auth/email/resetPassword.html', {
      first_name: first_name_to_email,
      link: `localhost:${process.env.APP_PORT}/${newToken.token}`,
    });

    sendEmail(html, user.email, `Olá ${first_name_to_email}! Redefina sua senha`);
  }
}

export { SendEmailToResetPasswordUseCase };
