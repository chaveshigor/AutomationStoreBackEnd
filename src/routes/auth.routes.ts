import { Router } from 'express';

import { AuthUserController } from '../modules/auth/useCases/authUser/authUserController';
import { ResetPasswordController } from '../modules/auth/useCases/resetPassword/resetPasswordController';
import { SendEmailToResetPasswordController } from '../modules/auth/useCases/sendEmailToResetPassword/sendEmailToResetPasswordController';

const authRoutes = Router();

authRoutes.post('/',
  new AuthUserController().handle);

authRoutes.post('/resetpassword',
  new SendEmailToResetPasswordController().handle);

authRoutes.patch('/',
  new ResetPasswordController().handle);

export { authRoutes };
