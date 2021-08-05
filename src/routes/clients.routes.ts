import { Router } from 'express';

import { ensureAuth } from '../middlewares/ensureAuth';
import { CreateClientController } from '../modules/client/useCases/createClient/createClientController';

const clientsRoutes = Router();

clientsRoutes.post('/',
  ensureAuth,
  new CreateClientController().handle);

export { clientsRoutes };
