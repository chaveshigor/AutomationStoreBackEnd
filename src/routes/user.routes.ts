import { Router } from 'express';

import { ensureAuth } from '../middlewares/ensureAuth';
import { checkIfCompanyExistsById } from '../modules/company/middlewares/companyMiddlewares';
import { checkIfUserExists, checkIfUserIsAdmin } from '../modules/users/middlewares/usersMiddlewares';
import { ChangeRoleController } from '../modules/users/useCases/changeRule/changeRoleController';
import { CreateUserController } from '../modules/users/useCases/createUser/createUserController';

const userRoutes = Router();

userRoutes.post('/',
  checkIfCompanyExistsById,
  new CreateUserController().handle);

userRoutes.patch('/',
  ensureAuth,
  checkIfUserExists,
  checkIfUserIsAdmin,
  new ChangeRoleController().handle);

export { userRoutes };
