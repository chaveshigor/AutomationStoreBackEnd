import { getRepository, Repository } from 'typeorm';

import { Client } from '../../../models/Client';
import { IRequestCreateClient, IFindOne, IUpdate } from '../interfaces';
import { IClientsRepository } from './IClientsRepository';

class ClientsRepository implements IClientsRepository {
    private repo: Repository<Client>

    constructor() {
      this.repo = getRepository(Client);
    }

    async create({
      first_name, last_name, company_id, email, cpf, phone,
    }: IRequestCreateClient): Promise<Client> {
      const newClient = this.repo.create({
        company_id,
        email,
        first_name,
        last_name,
        phone,
        cpf,
      });
      await this.repo.save(newClient);

      return newClient;
    }

    async findOne(userData: IFindOne): Promise<Client | undefined> {
      const client = await this.repo.findOne({ where: userData });

      return client;
    }

    async findAllFromCompany(company_id: string): Promise<Client[]> {
      const clients = await this.repo.find({ where: { company_id } });

      return clients;
    }

    async updateById(client_id: string, user_data: IUpdate): Promise<Client> {
      await this.repo.update({ id: client_id }, user_data);
      const client = await this.repo.findOne(client_id) as Client;

      return client;
    }

    async deleteById(client_id: string): Promise<void> {
      await this.repo.delete({ id: client_id });
    }
}

export { ClientsRepository };
