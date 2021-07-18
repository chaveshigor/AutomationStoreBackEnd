import { CreateCompanyController } from './createCompanyController';
import { CreateCompanyUseCase } from './createCompanyUseCase';

const useCase = new CreateCompanyUseCase();
const createCompanyController = new CreateCompanyController(useCase);

export { createCompanyController };
