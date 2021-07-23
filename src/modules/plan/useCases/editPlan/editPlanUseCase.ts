import { inject, injectable } from 'tsyringe';

import { Plan } from '../../../../models/Plan';
import { IRequestEditPlan } from '../../interfaces';
import { IPlansRepository } from '../../repositories/IPlansRepository';

@injectable()
class EditPlanUseCase {
  constructor(
    @inject('PlansRepository')
    private repo: IPlansRepository,
  ) {}

  async execute({ id, name, price }: IRequestEditPlan): Promise<Plan | undefined> {
    const { repo } = this;

    await repo.update({ id }, {
      name, price,
    });

    const updatedPlan = await repo.findOne({ id });

    return updatedPlan;
  }
}

export { EditPlanUseCase };
