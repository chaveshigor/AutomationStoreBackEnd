import { Router } from 'express';

import { checkIfCompanyExistsById } from '../modules/company/middlewares/companyMiddlewares';
import { checkIfUserExists, checkIfUserIsAdmin } from '../modules/users/middlewares/usersMiddlewares';
import { ChangeRoleController } from '../modules/users/useCases/changeRule/changeRoleController';
import { CreateUserController } from '../modules/users/useCases/createUser/createUserController';

const userRoutes = Router();

userRoutes.post('/',
  (req, res, next) => checkIfCompanyExistsById(req, res, next),
  new CreateUserController().handle);

userRoutes.patch('/',
  (req, res, next) => checkIfUserExists(req, res, next),
  (req, res, next) => checkIfUserIsAdmin(req, res, next),
  new ChangeRoleController().handle);

export { userRoutes };
