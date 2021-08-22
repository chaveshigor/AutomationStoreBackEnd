import { Router } from 'express';

import { authRoutes } from './auth.routes';
import { planRoutes } from './plan.routes';
import { shipProductRoutes } from './shipProduct.routes';
import { transporterRoutes } from './transporter.routes';
import { userRoutes } from './user.routes';

const routes = Router();

routes.use('/plans', planRoutes);
routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);
routes.use('/shipProduct', shipProductRoutes);
routes.use('/transporters', transporterRoutes);

export { routes };
