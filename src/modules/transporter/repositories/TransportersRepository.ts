import { getRepository, Repository } from 'typeorm';

import { Transporter } from '../../../models/Transporter';
import { ITransportersRepository } from './ITransportersRepository';

class TransportersRepository implements ITransportersRepository {
    private repo: Repository<Transporter>

    constructor() {
      this.repo = getRepository(Transporter);
    }

    async findById(transporter_id: string): Promise<Transporter | undefined> {
      const transporter = await this.repo.findOne(transporter_id);
      return transporter;
    }

    async create(name: string): Promise<Transporter> {
      const newTransporter = this.repo.create({
        name,
      });
      await this.repo.save(newTransporter);

      return newTransporter;
    }

    async editName(transporter_id: string, new_name: string): Promise<Transporter> {
      await this.repo.update(transporter_id, {
        name: new_name,
      });
      const transporter = await this.repo.findOne(transporter_id) as Transporter;

      return transporter;
    }
}

export { TransportersRepository };
