import { Router } from 'express';

import { authRoutes } from './auth.routes';
import { clientsRoutes } from './clients.routes';
import { companyRoutes } from './company.routes';
import { planRoutes } from './plan.routes';
import { userRoutes } from './user.routes';

const routes = Router();

routes.use('/companies', companyRoutes);
routes.use('/plans', planRoutes);
routes.use('/users', userRoutes);
routes.use('/clients', clientsRoutes);
routes.use('/auth', authRoutes);

export { routes };
