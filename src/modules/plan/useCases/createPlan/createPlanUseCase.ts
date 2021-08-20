import { inject, injectable } from 'tsyringe';

import { Plan } from '../../../../models/Plan';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { IRequestCreatePlan } from '../../interfaces';
import { IPlansRepository } from '../../repositories/IPlansRepository';

@injectable()
class CreatePlanUseCase {
  constructor(
    @inject('PlansRepository')
    private repo: IPlansRepository,
  ) {}

  async execute({ name, price }: IRequestCreatePlan): Promise<Plan> {
    const { repo } = this;

    const plan = await repo.findOne({ name });

    if (plan) {
      throw new ErrorHandler('Plan already exists', 400);
    }

    const newPlan = await repo.create({
      name,
      price,
    });

    return newPlan;
  }
}

export { CreatePlanUseCase };
