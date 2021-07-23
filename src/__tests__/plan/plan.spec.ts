import { getCustomRepository } from 'typeorm';

import { Plan } from '../../models/Plan';
import { MockPlansRepository } from '../../modules/plan/repositories/__mock__/repository';
import { PlansRepository } from '../../modules/plan/repositories/plansRepository';
import { CreatePlanUseCase } from '../../modules/plan/useCases/createPlan/createPlanUseCase';

describe('teste', () => {
  jest.mock('typeorm', () => ({ getCustomRepository: jest.fn() }));
  const plansRepo = () => {
    const plan = {
      name: 'plan test',
      price: 50.00,
    };

    return {
      findOne: jest.fn().mockResolvedValueOnce(plan) as unknown as Promise<Plan | undefined>,
      create: jest.fn().mockResolvedValueOnce(plan) as unknown as Plan,
      save: jest.fn() as unknown as Promise<Plan>,
    };
  };

  it('should do something', async () => {
    const repo = plansRepo();
    const createPlanUseCase = new CreatePlanUseCase(repo);
    const newPlan = await createPlanUseCase.execute({ name: 'higor', price: 40.00 });
    console.log(newPlan);

    expect(newPlan).toMatchObject({
      name: 'higor',
      price: 40,
    });
  });
});
