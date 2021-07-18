import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';

import { ErrorHandler } from '../../../../ErrorHandler';
import { Plan } from '../../../../models/Plan';
import { IRequestEditPlan } from '../../interfaces';
import { PlansRepository } from '../../repositories/plansRepository';

class EditPlanUseCase {
  async execute({ id, name, price }: IRequestEditPlan): Promise<Plan | undefined> {
    const repo = getCustomRepository(PlansRepository);

    if (!validate(id)) {
      throw new ErrorHandler('invalid id', 400);
    }

    const plan = await repo.findOne({ id });
    if (!plan) {
      throw new ErrorHandler('plan dont exists', 404);
    }

    await repo.update({ id }, {
      name, price,
    });

    const updatedPlan = await repo.findOne(id);

    return updatedPlan;
  }
}

export { EditPlanUseCase };
