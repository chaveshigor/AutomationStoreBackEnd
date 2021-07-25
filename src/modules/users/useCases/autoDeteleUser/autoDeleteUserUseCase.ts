import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class AutoDeleteUserUseCase {
  constructor(
        @inject('UsersRepository')
        private repo: IUsersRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.deleteById(id);
  }
}

export { AutoDeleteUserUseCase };
