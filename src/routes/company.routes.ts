import { Router } from 'express';

import { checkIfCompanyExists } from '../modules/company/middlewares/companyMiddlewares';
import { ChangePlanController } from '../modules/company/useCases/changePlan/changePlanController';
import { CreateCompanyController } from '../modules/company/useCases/createCompany/createCompanyController';
import { DeleteCompanyController } from '../modules/company/useCases/deleteCompany/deleteCompanyController';
import { EditCompanyController } from '../modules/company/useCases/editCompany/editCompanyController';
import { checkIfPlanExists } from '../modules/plan/middleware/planMiddlewares';

const companyRoutes = Router();

companyRoutes.post('/:plan_id',
  (req, res, next) => checkIfPlanExists(req, res, next),
  new CreateCompanyController().handle);

companyRoutes.put('/',
  (req, res, next) => checkIfCompanyExists(req, res, next),
  new EditCompanyController().handle);

companyRoutes.patch('/:plan_id',
  (req, res, next) => checkIfCompanyExists(req, res, next),
  new ChangePlanController().handle);

companyRoutes.delete('/',
  (req, res, next) => checkIfCompanyExists(req, res, next),
  new DeleteCompanyController().handle);

export { companyRoutes };
