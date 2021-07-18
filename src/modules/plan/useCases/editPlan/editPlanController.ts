import { Request, Response } from 'express';

import { EditPlanUseCase } from './editPlanUseCase';

class EditPlanController {
    private editPlanUseCase: EditPlanUseCase

    constructor(editPlanUseCase: EditPlanUseCase) {
      this.editPlanUseCase = editPlanUseCase;
    }

    async handle(req: Request, res: Response): Promise<Response> {
      const { id } = req.params;
      const { name, price } = req.body;

      const plan = await this.editPlanUseCase.execute({ id, name, price });

      return res.json(plan);
    }
}
export { EditPlanController };
