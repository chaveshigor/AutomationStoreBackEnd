import { getCustomRepository } from 'typeorm';

import { Plan } from '../../../../models/Plan';
import { IRequestEditPlan } from '../../interfaces';
import { PlansRepository } from '../../repositories/plansRepository';

class EditPlanUseCase {
  async execute({ id, name, price }: IRequestEditPlan): Promise<Plan | undefined> {
    const repo = getCustomRepository(PlansRepository);

    await repo.update({ id }, {
      name, price,
    });

    const updatedPlan = await repo.findOne(id);

    return updatedPlan;
  }
}

export { EditPlanUseCase };
