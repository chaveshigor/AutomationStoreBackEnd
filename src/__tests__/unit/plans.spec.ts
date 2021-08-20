import { PlansRepositoryInMemory } from '../../modules/plan/repositories/plansRepositoryInMemory';
import { CreatePlanUseCase } from '../../modules/plan/useCases/createPlan/createPlanUseCase';
import { EditPlanUseCase } from '../../modules/plan/useCases/editPlan/editPlanUseCase';
import { planSeed } from '../utils/seeds';

let plansRepository: PlansRepositoryInMemory;
let createPlanUseCase: CreatePlanUseCase;
let editPlanUseCase: EditPlanUseCase;

describe('plans features', () => {
  beforeEach(async () => {
    plansRepository = new PlansRepositoryInMemory();
    createPlanUseCase = new CreatePlanUseCase(plansRepository);
    editPlanUseCase = new EditPlanUseCase(plansRepository);
  });

  it('should create a new plan', async () => {
    const plan = await planSeed(plansRepository);
    const newPlan = await createPlanUseCase.execute(plan);

    expect(newPlan).toHaveProperty('id');
    expect(newPlan).toMatchObject(plan);
  });

  it('should change a plans price', async () => {
    const newPrice = 14.87;
    const { id, name } = await planSeed(plansRepository, true) as
    {id: string, name: string, price: number};
    const editedPlan = await editPlanUseCase.execute({ id, name, price: newPrice });

    expect(editedPlan?.price).toBe(newPrice);
  });
});
