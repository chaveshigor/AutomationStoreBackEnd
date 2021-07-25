import { inject, injectable } from 'tsyringe';

import { User } from '../../../../models/User';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { IRequestChangeRole } from '../../interfaces';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class ChangeRoleUseCase {
  constructor(
    @inject('UsersRepository')
    private repo: IUsersRepository,
  ) {}
  async execute(
    { user_changer, user_to_change_role }: IRequestChangeRole,
  ): Promise<User | undefined> {
    const { repo } = this;
    let user_to_change = await repo.findOne({ id: user_to_change_role });

    if (!user_to_change) {
      throw new ErrorHandler('user dont exists', 404);
    }

    user_to_change = await repo.update({ id: user_to_change_role }, {
      admin: !user_to_change?.admin,
    });

    return user_to_change;
  }
}

export { ChangeRoleUseCase };
