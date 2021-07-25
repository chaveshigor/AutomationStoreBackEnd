import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendEmailToResetPasswordUseCase } from './sendEmailToResetPasswordUseCase';

class SendEmailToResetPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendEmailToResetPasswordUseCase = container.resolve(SendEmailToResetPasswordUseCase);

    await sendEmailToResetPasswordUseCase.execute(email);

    return res.send();
  }
}

export { SendEmailToResetPasswordController };
