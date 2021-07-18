import { MockPlansRepository } from '../../modules/plan/repositories/__mock__/repository';
import { CreatePlanUseCase } from '../../modules/plan/useCases/createPlan/createPlanUseCase';

describe('teste', () => {
  it('should do something', async () => {
    const repo = new MockPlansRepository();
    const createPlanUseCase = new CreatePlanUseCase();
    const newPlan = await createPlanUseCase.execute({ name: 'higor', price: 40.00 }, repo);
    console.log(newPlan);

    expect(newPlan).toMatchObject({
      name: 'higor',
      price: 40.00,
    });
  });
});
