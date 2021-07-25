import { inject, injectable } from 'tsyringe';

import { Plan } from '../../../../models/Plan';
import { IPlansRepository } from '../../repositories/IPlansRepository';

@injectable()
class ListPlansUseCase {
  constructor(
    @inject('PlansRepository')
    private repo: IPlansRepository,
  ) {}

  async execute(): Promise<Plan[]> {
    const plans = await this.repo.list();

    return plans;
  }
}

export { ListPlansUseCase };
