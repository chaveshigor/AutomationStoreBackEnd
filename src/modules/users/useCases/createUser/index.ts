import { CreateUserController } from './createUserController';
import { CreateUserUseCase } from './createUserUseCase';

const createUserUseCase = new CreateUserUseCase();
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
