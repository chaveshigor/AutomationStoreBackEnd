import { Router } from 'express';

import { createCompanyController } from '../modules/company/useCases/createCompany';

const companyRoutes = Router();

companyRoutes.post('/', (req, res) => createCompanyController.handle(req, res));

export { companyRoutes };
