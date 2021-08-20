import { EntityRepository, getRepository, Repository } from 'typeorm';

import { User } from '../../../models/User';
import { IParams, IUsersRepository } from './IUsersRepository';

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
    private repo: Repository<User>

    constructor() {
      this.repo = getRepository(User);
    }

    async deleteById(user_id: string): Promise<void> {
      await this.repo.delete(user_id);
    }

    async findOne(params: IParams): Promise<User | undefined> {
      const user = await this.repo.findOne({ where: params });

      return user;
    }
    async create(userData: IParams): Promise<User> {
      const newUser = await this.repo.create(userData);
      await this.repo.save(newUser);

      return newUser;
    }
    async updatePlan(user_id: string, new_plan_id: string): Promise<User | undefined> {
      await this.repo.update(user_id, { plan_id: new_plan_id });
      const user = await this.repo.findOne(user_id);

      return user;
    }
}

export { UsersRepository };
