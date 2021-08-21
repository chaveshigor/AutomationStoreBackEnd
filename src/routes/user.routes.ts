import { Router } from 'express';

import { ensureAuth } from '../middlewares/ensureAuth';
import { AutoDeleteUserController } from '../modules/users/useCases/autoDeteleUser/autoDeleteUserController';
import { ChangeUserPlanController } from '../modules/users/useCases/changeUserPlan/changeUserPlanController';
import { CreateUserController } from '../modules/users/useCases/createUser/createUserController';

const userRoutes = Router();

userRoutes.post('/',
  new CreateUserController().handle);

userRoutes.patch('/',
  ensureAuth,
  new ChangeUserPlanController().handle);

userRoutes.delete('/',
  ensureAuth,
  new AutoDeleteUserController().handle);

export { userRoutes };
