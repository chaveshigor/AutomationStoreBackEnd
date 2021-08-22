import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EditTransporterNameUseCase } from './editTransporterNameUseCase';

class EditTransporterNameController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id, new_name } = req.body;

    const editNameTransporterUseCase = container.resolve(EditTransporterNameUseCase);
    const transporter = await editNameTransporterUseCase.execute(id, new_name);

    return res.json(transporter);
  }
}

export { EditTransporterNameController };
