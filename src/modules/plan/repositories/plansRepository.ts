import { EntityRepository, getRepository, Repository } from 'typeorm';

import { Plan } from '../../../models/Plan';
import { IPlansRepository, IParams } from './IPlansRepository';

@EntityRepository(Plan)
class PlansRepository implements IPlansRepository {
    private repo: Repository<Plan>

    constructor() {
      this.repo = getRepository(Plan);
    }

    async create(planData: IParams): Promise<Plan> {
      const newPlan = this.repo.create(planData);
      await this.repo.save(newPlan);

      return newPlan;
    }

    async findOne(where: IParams): Promise<Plan | undefined> {
      const plan = await this.repo.findOne({ where });

      return plan;
    }

    async update(planToUpdate: IParams, planData: IParams): Promise<Plan | undefined> {
      await this.repo.update(planToUpdate, planData);

      const plan = await this.repo.findOne({ where: planToUpdate });

      return plan;
    }
}

export { PlansRepository };
