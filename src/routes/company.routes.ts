import { Router } from 'express';

import { checkIfCompanyExists } from '../middlewares/companyMiddlewares';
import { checkIfPlanExists } from '../middlewares/planMiddlewares';
import { ChangePlanController } from '../modules/company/useCases/changePlan/changePlanController';
import { CreateCompanyController } from '../modules/company/useCases/createCompany/createCompanyController';
import { DeleteCompanyController } from '../modules/company/useCases/deleteCompany/deleteCompanyController';
import { EditCompanyController } from '../modules/company/useCases/editCompany/editCompanyController';

const companyRoutes = Router();

companyRoutes.post('/:plan_id',
  checkIfPlanExists,
  new CreateCompanyController().handle);

companyRoutes.put('/',
  checkIfCompanyExists,
  new EditCompanyController().handle);

companyRoutes.patch('/:plan_id',
  checkIfCompanyExists,
  new ChangePlanController().handle);

companyRoutes.delete('/',
  checkIfCompanyExists,
  new DeleteCompanyController().handle);

export { companyRoutes };
