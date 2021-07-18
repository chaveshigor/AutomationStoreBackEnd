import { getCustomRepository } from 'typeorm';

import { ErrorHandler } from '../../../../ErrorHandler';
import { Plan } from '../../../../models/Plan';
import { IRequestCreatePlan } from '../../interfaces';
import { IPlansRepository } from '../../repositories/IPlansRepository';
import { PlansRepository } from '../../repositories/plansRepository';

class CreatePlanUseCase {
  async execute({ name, price }: IRequestCreatePlan, repository?: IPlansRepository): Promise<Plan> {
    const repo = repository || getCustomRepository(PlansRepository);

    const plan = await repo.findOne({
      where: { name },
    });

    if (plan) {
      throw new ErrorHandler('Plan already exists', 400);
    }

    const newPlan = repo.create({
      name,
      price,
    });
    await repo.save(newPlan);

    return newPlan;
  }
}

export { CreatePlanUseCase };
