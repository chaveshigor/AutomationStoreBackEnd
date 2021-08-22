import { Transporter } from '../../../models/Transporter';
import { ITransportersRepository } from './ITransportersRepository';

class TransportersRepositoryInMemory implements ITransportersRepository {
    private repo: Transporter[]

    constructor() {
      this.repo = [];
    }

    async findById(transporter_id: string): Promise<Transporter | undefined> {
      return this.repo.find((transporter) => transporter.id === transporter_id);
    }

    async create(name: string): Promise<Transporter> {
      const newTransporter = new Transporter();

      Object.assign(newTransporter, {
        name,
        created_at: new Date(),
        updated_at: new Date(),
      });

      this.repo.push(newTransporter);

      return newTransporter;
    }
    async editName(transporter_id: string, new_name: string): Promise<Transporter> {
      const transporter = this.repo.find(
        (transporter) => transporter.id === transporter_id,
      ) as Transporter;
      const index = this.repo.indexOf(transporter);

      Object.assign(this.repo[index], {
        name: new_name,
      });

      return this.repo[index];
    }
}

export { TransportersRepositoryInMemory };
