import { Router } from 'express';

import { checkIfCompanyExistsById } from '../modules/company/middlewares/companyMiddlewares';
import { createUserController } from '../modules/users/useCases/createUser/index';

const userRoutes = Router();

userRoutes.post('/', (req, res, next) => checkIfCompanyExistsById(req, res, next), (req, res) => createUserController.handle(req, res));

export { userRoutes };
