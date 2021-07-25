import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ChangeRoleUseCase } from './changeRoleUseCase';

class ChangeRoleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user_to_change_role } = req.body;
    const { id: user_id } = req.user;

    const changeRoleUseCase = container.resolve(ChangeRoleUseCase);

    const user_updated = await changeRoleUseCase.execute(
      { user_changer: user_id, user_to_change_role },
    );

    return res.json(user_updated);
  }
}

export { ChangeRoleController };
