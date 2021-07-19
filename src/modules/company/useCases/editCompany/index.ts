import { EditCompanyController } from './editCompanyController';
import { EditCompanyUseCase } from './editCompanyUseCase';

const editCompanyUseCase = new EditCompanyUseCase();
const editCompanyController = new EditCompanyController(editCompanyUseCase);

export { editCompanyController };
