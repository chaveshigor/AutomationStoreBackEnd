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
    async update(userToChange: IParams, userData: IParams): Promise<User | undefined> {
      await this.repo.update(userToChange, userData);
      const user = await this.findOne(userToChange);

      return user;
    }
}

export { UsersRepository };
