import { Router } from 'express';

import { companyRoutes } from './company.routes';
import { planRoutes } from './plan.routes';
import { userRoutes } from './user.routes';

const routes = Router();

routes.use('/companies', companyRoutes);
routes.use('/plans', planRoutes);
routes.use('/users', userRoutes);

export { routes };
