import { Router } from 'express';

import { checkIfCompanyExistsById } from '../middlewares/companyMiddlewares';
import { ensureAuth } from '../middlewares/ensureAuth';
import { checkIfUserIsAdmin } from '../middlewares/usersMiddlewares';
import { CreateProductController } from '../modules/product/useCases/createProduct/createProductController';
import { DeleteProductController } from '../modules/product/useCases/deleteProduct/seleteProductController';
import { ListProductsFromCompanyController } from '../modules/product/useCases/listProductsFromCompany/listProductsFromCompanyController';
import { UpdateProductController } from '../modules/product/useCases/updateProduct/updateProductController';

const productRoutes = Router();

productRoutes.post('/',
  ensureAuth,
  checkIfCompanyExistsById,
  new CreateProductController().handle);

productRoutes.delete('/',
  ensureAuth,
  checkIfUserIsAdmin,
  new DeleteProductController().handle);

productRoutes.get('/',
  ensureAuth,
  new ListProductsFromCompanyController().handle);

productRoutes.put('/',
  ensureAuth,
  new UpdateProductController().handle);

export { productRoutes };
