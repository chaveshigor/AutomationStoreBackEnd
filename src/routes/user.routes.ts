import { Router } from 'express';

import { checkIfCompanyExistsById } from '../middlewares/companyMiddlewares';
import { ensureAuth } from '../middlewares/ensureAuth';
import { checkIfUserIsAdmin } from '../middlewares/usersMiddlewares';
import { AutoDeleteUserController } from '../modules/users/useCases/autoDeteleUser/autoDeleteUserController';
import { ChangeRoleController } from '../modules/users/useCases/changeRule/changeRoleController';
import { CreateUserController } from '../modules/users/useCases/createUser/createUserController';

const userRoutes = Router();

userRoutes.post('/',
  checkIfCompanyExistsById,
  new CreateUserController().handle);

userRoutes.patch('/',
  ensureAuth,
  checkIfUserIsAdmin,
  new ChangeRoleController().handle);

userRoutes.delete('/',
  ensureAuth,
  new AutoDeleteUserController().handle);

export { userRoutes };
