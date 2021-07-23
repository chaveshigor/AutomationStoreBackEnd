import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EditPlanUseCase } from './editPlanUseCase';

class EditPlanController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, price } = req.body;

    const editPlanUseCase = container.resolve(EditPlanUseCase);

    const plan = await editPlanUseCase.execute({ id, name, price });

    return res.json(plan);
  }
}
export { EditPlanController };
