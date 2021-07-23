import { inject, injectable } from 'tsyringe';

import { ErrorHandler } from '../../../../ErrorHandler';
import { Plan } from '../../../../models/Plan';
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

    const newPlan = repo.create({
      name,
      price,
    });

    return newPlan;
  }
}

export { CreatePlanUseCase };
