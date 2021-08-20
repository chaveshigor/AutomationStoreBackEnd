import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ChangeUserPlanUseCase } from './changeUserPlanUseCase';

class ChangeUserPlanController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user: { id: user_id } } = req;
    const { new_plan_id } = req.body;

    const changeUserPlanUseCase = container.resolve(ChangeUserPlanUseCase);

    const newUser = await changeUserPlanUseCase.execute({
      user_id, new_plan_id,
    });

    return res.status(201).json(newUser);
  }
}

export { ChangeUserPlanController };
