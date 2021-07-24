import { Router } from 'express';

import { AuthUserController } from '../modules/auth/authUser/authUserController';

const authRoutes = Router();

authRoutes.post('/', new AuthUserController().handle);

export { authRoutes };
