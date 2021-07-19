import { DeleteCompanyController } from './deleteCompanyController';
import { DeleteCompanyUseCase } from './deleteCompanyUseCase';

const deleteCompanyUseCase = new DeleteCompanyUseCase();
const deleteCompanyController = new DeleteCompanyController(deleteCompanyUseCase);

export { deleteCompanyController };
