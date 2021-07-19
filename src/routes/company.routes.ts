import { Router } from 'express';

import { checkIfCompanyExists } from '../modules/company/middlewares/companyMiddlewares';
import { changePlanController } from '../modules/company/useCases/changePlan';
import { createCompanyController } from '../modules/company/useCases/createCompany';
import { deleteCompanyController } from '../modules/company/useCases/deleteCompany';
import { editCompanyController } from '../modules/company/useCases/editCompany';
import { checkIfPlanExists } from '../modules/plan/middleware/planMiddlewares';

const companyRoutes = Router();

companyRoutes.post('/:plan_id', (req, res, next) => checkIfPlanExists(req, res, next), (req, res) => createCompanyController.handle(req, res));
companyRoutes.put('/', (req, res, next) => checkIfCompanyExists(req, res, next), (req, res) => editCompanyController.handle(req, res));
companyRoutes.patch('/:plan_id', (req, res, next) => checkIfCompanyExists(req, res, next), (req, res) => changePlanController.handle(req, res));
companyRoutes.delete('/', (req, res, next) => checkIfCompanyExists(req, res, next), (req, res) => deleteCompanyController.handle(req, res));

export { companyRoutes };
