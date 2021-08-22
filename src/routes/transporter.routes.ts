import { Router } from 'express';

import { ensureAuth } from '../middlewares/ensureAuth';
import { CreateTransporterController } from '../modules/transporter/useCases/createTransporter/createTransporterController';

const transporterRoutes = Router();

transporterRoutes.post('/',
  ensureAuth,
  new CreateTransporterController().handle);

export { transporterRoutes };
