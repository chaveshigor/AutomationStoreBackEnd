import { Plan } from '../../models/Plan';
import { PlansRepositoryInMemory } from '../../modules/plan/repositories/plansRepositoryInMemory';
import { UsersRepositoryInMemory } from '../../modules/users/repositories/UsersRepositoryInMemory';
import { ChangeUserPlanUseCase } from '../../modules/users/useCases/changeUserPlan/changeUserPlanUseCase';
import { CreateUserUseCase } from '../../modules/users/useCases/createUser/createUserUseCase';
import { planSeed, userSeed } from '../utils/seeds';

let usersRepository: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let changeUserPlanUseCase: ChangeUserPlanUseCase;
let plan: Plan;
let plan2: Plan;

describe('users features', () => {
  beforeEach(async () => {
    const plansRepository = new PlansRepositoryInMemory();
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    changeUserPlanUseCase = new ChangeUserPlanUseCase(usersRepository);
    plan = await planSeed(plansRepository, true);
    plan2 = await planSeed(plansRepository, true);
  });

  it('should create a new user', async () => {
    const user = await userSeed(usersRepository, plan.id as string);
    const newUser = await createUserUseCase.execute(user);

    expect(newUser).toHaveProperty('id');
    expect(newUser.password).not.toBe(user.password);
  });

  it('should change the user plan', async () => {
    const user = await userSeed(usersRepository, plan.id as string, true);
    const editedUser = await changeUserPlanUseCase.execute(
      { user_id: user.id as string, new_plan_id: plan2.id as string },
    );

    expect(editedUser?.plan_id).not.toBe(plan.id);
    expect(editedUser?.plan_id).toBe(plan2.id);
  });
});
