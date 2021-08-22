import { inject, injectable } from 'tsyringe';

import { Transporter } from '../../../../models/Transporter';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { ITransportersRepository } from '../../repositories/ITransportersRepository';

@injectable()
class EditTransporterNameUseCase {
  constructor(
        @inject('TransportersRepository')
        private repo: ITransportersRepository,
  ) {}

  async execute(transporter_id: string, new_name: string): Promise<Transporter> {
    const transporter = await this.repo.findById(transporter_id);
    if (!transporter) {
      throw new ErrorHandler('transporter dont exists', 404);
    }

    const newTransporter = await this.repo.editName(transporter_id, new_name);

    return newTransporter;
  }
}

export { EditTransporterNameUseCase };
