import { Plan } from '../../models/Plan';
import { User } from '../../models/User';
import { TokensRepositoryInMemory } from '../../modules/auth/repositories/tokensRepositoryInMemory';
import { AuthUserUseCase } from '../../modules/auth/useCases/authUser/authUserUseCase';
import { ResetPasswordUseCase } from '../../modules/auth/useCases/resetPassword/resetPasswordUseCase';
import { SendEmailToResetPasswordUseCase } from '../../modules/auth/useCases/sendEmailToResetPassword/sendEmailToResetPasswordUseCase';
import { PlansRepositoryInMemory } from '../../modules/plan/repositories/plansRepositoryInMemory';
import { UsersRepositoryInMemory } from '../../modules/users/repositories/UsersRepositoryInMemory';
import { planSeed, userSeed } from '../utils/seeds';

let plansRepository: PlansRepositoryInMemory;
let usersRepository: UsersRepositoryInMemory;
let tokensRepository: TokensRepositoryInMemory;
let authUserUseCase: AuthUserUseCase;
let sendEmailToResetPasswordUseCase: SendEmailToResetPasswordUseCase;
let resetPasswordUseCase: ResetPasswordUseCase;
let plan: Plan;
let user: User;

describe('auth features', () => {
  beforeEach(async () => {
    usersRepository = new UsersRepositoryInMemory();
    plansRepository = new PlansRepositoryInMemory();
    tokensRepository = new TokensRepositoryInMemory();
    authUserUseCase = new AuthUserUseCase(usersRepository);
    sendEmailToResetPasswordUseCase = new SendEmailToResetPasswordUseCase(
      tokensRepository, usersRepository,
    );
    resetPasswordUseCase = new ResetPasswordUseCase(tokensRepository, usersRepository);
    plan = await planSeed(plansRepository, true);
    user = await userSeed(usersRepository, plan.id as string, true);
  });

  it('should auth an user', async () => {
    const userAuth = await authUserUseCase.execute({ email: user.email, password: '123456' });

    expect(userAuth).toHaveProperty('token');
    expect(userAuth).toHaveProperty('user');
  });

  it('should not auth an user with a wrong password', async () => {
    let authStatus = false;
    let errorMessage = '';
    try {
      await authUserUseCase.execute({ email: user.email, password: 'wrong password' });
      authStatus = true;
    } catch (error) {
      errorMessage = error.message;
    }

    expect(authStatus).toBe(false);
    expect(errorMessage).toBe('wrong email or password');
  });

  it('should not auth an user with a wrong email', async () => {
    let authStatus = false;
    let errorMessage = '';
    try {
      await authUserUseCase.execute({ email: `${user.email}WRONG EMAIL`, password: '123456' });
      authStatus = true;
    } catch (error) {
      errorMessage = error.message;
    }

    expect(authStatus).toBe(false);
    expect(errorMessage).toBe('wrong email or password');
  });

  it('should generate a token to reset password', async () => {
    const token = await sendEmailToResetPasswordUseCase.execute(user.email);

    expect(token.length).toBeGreaterThan(10);
  });

  it('should create a new password', async () => {
    const token = await sendEmailToResetPasswordUseCase.execute(user.email);
    await resetPasswordUseCase.execute({ email: user.email, token, new_password: '654321' });
    let authStatus = false;
    try {
      await authUserUseCase.execute({ email: user.email, password: '654321' });
      authStatus = true;
    } catch (error) {
      authStatus = false;
    }

    expect(authStatus).toBe(true);
  });
});
