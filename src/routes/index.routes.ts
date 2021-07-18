import { Router } from 'express';

import { companyRoutes } from './company.routes';
import { planRoutes } from './plan.routes';

const routes = Router();

routes.use('/companies', companyRoutes);
routes.use('/plans', planRoutes);

export { routes };
