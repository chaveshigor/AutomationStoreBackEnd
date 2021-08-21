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
        return this.repo.find((user) => user.email === params.email);
      }
      if (params.plan_id) {
        return this.repo.find((user) => user.plan_id === params.plan_id);
      }

      return undefined;
    }

    async create({
      plan_id, email, first_name, last_name, password,
    }: IParams): Promise<User> {
      const newUser = new User();

      Object.assign(newUser, {
        plan_id, email, first_name, last_name, password,
      });
      this.repo.push(newUser);
      return newUser;
    }

    async updatePlan(user_id: string, plan_id: string): Promise<User | undefined> {
      const user = this.repo.find((user) => user.id === user_id) as User;
      const index = this.repo.indexOf(user) as number;

      Object.assign(this.repo[index], {
        updated_at: new Date(),
        plan_id,
      });
      return this.repo[index];
    }

    async updatePassword(user_id: string, new_password: string): Promise<User> {
      const user = this.repo.find((user) => user.id === user_id) as User;
      const index = this.repo.indexOf(user) as number;

      Object.assign(this.repo[index], {
        updated_at: new Date(),
        password: new_password,
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
