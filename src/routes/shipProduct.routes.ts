import { Router } from 'express';

import { ensureAuth } from '../middlewares/ensureAuth';
import { CreateProductController } from '../modules/shippedProduct/useCases/createProduct/createProductController';
import { DeleteProductController } from '../modules/shippedProduct/useCases/deleteProduct/seleteProductController';
import { ListUserProductsController } from '../modules/shippedProduct/useCases/listUserProducts/listUserProductsController';

const shipProductRoutes = Router();

shipProductRoutes.post('/',
  ensureAuth,
  new CreateProductController().handle);

shipProductRoutes.get('/',
  ensureAuth,
  new ListUserProductsController().handle);

shipProductRoutes.delete('/',
  ensureAuth,
  new DeleteProductController().handle);

export { shipProductRoutes };
