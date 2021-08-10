import { Router } from 'express';

import { ShipNewProductController } from '../modules/product/useCases/shipNewProduct/ShipNewProductController';

const shipProductRoutes = Router();

shipProductRoutes.post('/', new ShipNewProductController().handle);

export { shipProductRoutes };
