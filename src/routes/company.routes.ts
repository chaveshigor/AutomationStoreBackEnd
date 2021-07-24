import { Router } from 'express';

import { checkIfCompanyExists } from '../modules/company/middlewares/companyMiddlewares';
import { ChangePlanController } from '../modules/company/useCases/changePlan/changePlanController';
import { CreateCompanyController } from '../modules/company/useCases/createCompany/createCompanyController';
import { DeleteCompanyController } from '../modules/company/useCases/deleteCompany/deleteCompanyController';
import { EditCompanyController } from '../modules/company/useCases/editCompany/editCompanyController';
import { checkIfPlanExists } from '../modules/plan/middleware/planMiddlewares';

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
