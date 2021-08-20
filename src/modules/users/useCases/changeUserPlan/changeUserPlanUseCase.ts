import { inject, injectable } from 'tsyringe';

import { User } from '../../../../models/User';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { IRequestChangePlan } from '../../interfaces';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class ChangeUserPlanUseCase {
  constructor(
    @inject('UsersRepository')
    private repo: IUsersRepository,
  ) {}

  async execute(
    { user_id, new_plan_id }: IRequestChangePlan,
  ): Promise<User | undefined> {
    const { repo } = this;
    let user = await repo.findOne({ id: user_id });

    if (!user) {
      throw new ErrorHandler('user dont exists', 404);
    }

    user = await repo.updatePlan(user_id, new_plan_id);

    return user;
  }
}

export { ChangeUserPlanUseCase };
