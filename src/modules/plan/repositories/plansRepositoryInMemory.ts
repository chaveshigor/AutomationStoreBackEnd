import { Plan } from '../../../models/Plan';
import { INewPlanRequest, IParams, IPlansRepository } from './IPlansRepository';

class PlansRepositoryInMemory implements IPlansRepository {
    private repo: Plan[]

    constructor() {
      this.repo = [];
    }

    async create({ name, price }: INewPlanRequest): Promise<Plan> {
      const newPlan = new Plan();
      Object.assign(newPlan, {
        name,
        price,
        created_at: new Date(),
        updated_at: new Date(),
      });
      this.repo.push(newPlan);

      return newPlan;
    }

    async findOne(where: IParams): Promise<Plan | undefined> {
      if (where.id) {
        return this.repo.find((plan) => plan.id === where.id);
      }

      if (where.name) {
        return this.repo.find((plan) => plan.name === where.name);
      }

      return undefined;
    }

    async update(planToUpdate: IParams, planData: IParams): Promise<Plan | undefined> {
      const plan = this.repo.find((plan) => plan.id === planToUpdate.id) as Plan;
      const index = this.repo.indexOf(plan);

      Object.assign(this.repo[index], {
        name: planData.name,
        price: planData.price,
      });

      return this.repo[index];
    }

    async list(): Promise<Plan[]> {
      return this.repo;
    }
}

export { PlansRepositoryInMemory };
