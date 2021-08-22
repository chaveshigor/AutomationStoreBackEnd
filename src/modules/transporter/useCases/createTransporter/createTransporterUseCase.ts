import { inject, injectable } from 'tsyringe';

import { Transporter } from '../../../../models/Transporter';
import { ITransportersRepository } from '../../repositories/ITransportersRepository';

@injectable()
class CreateTransporterUseCase {
  constructor(
        @inject('TransportersRepository')
        private repo: ITransportersRepository,
  ) {}

  async execute(name: string): Promise<Transporter> {
    const newTransporter = await this.repo.create(name);

    return newTransporter;
  }
}

export { CreateTransporterUseCase };
