import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordUseCase } from './resetPasswordUseCase';

class ResetPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, token, new_password } = req.body;

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    await resetPasswordUseCase.execute({ email, token, new_password });

    return res.send();
  }
}

export { ResetPasswordController };
