import { User } from '../../../models/User';
import { IParams, IUsersRepository } from './IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
    private repo: User[]

    constructor() {
      this.repo = [];
    }

    async findOne(params: IParams): Promise<User | undefined> {
      if (params.id) {
        return this.repo.find((user) => user.id === params.id);
      }
      if (params.email) {
        return this.repo.find((user) => user.id === params.email);
      }
      if (params.company_id) {
        return this.repo.find((user) => user.id === params.company_id);
      }

      return undefined;
    }

    async create({
      company_id, email, first_name, last_name,
    }: IParams): Promise<User> {
      const newUser = new User();

      Object.assign(newUser, {
        company_id, email, first_name, last_name,
      });
      this.repo.push(newUser);
      return newUser;
    }

    async update(userToChange: IParams, {
      admin, email, last_name, first_name,
    }: IParams): Promise<User | undefined> {
      let user: User;
      let index = 0;
      user = new User();

      if (userToChange.id) {
        user = this.repo.find((user) => user.id === userToChange.id) as User;
      }
      if (userToChange.email) {
        user = this.repo.find((user) => user.email === userToChange.email) as User;
      }

      index = this.repo.indexOf(user);
      Object.assign(this.repo[index], {
        updated_at: new Date(),

      });
      return this.repo[index];
    }

    async deleteById(user_id: string): Promise<void> {
      const currentuser = this.repo.find((user) => user.id === user_id) as User;
      const index = this.repo.indexOf(currentuser);
      this.repo.splice(index, 1);
    }
}

export { UsersRepositoryInMemory };
