import { inject, injectable } from 'tsyringe';

import { Client } from '../../../../models/Client';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { IRequestCreateClient } from '../../interfaces';
import { IClientsRepository } from '../../repositories/IClientsRepository';

@injectable()
class CreateClientUseCase {
  constructor(
    @inject('ClientsRepository')
    private repo: IClientsRepository,
  ) {}

  async execute({
    last_name, phone, company_id, cpf, email, first_name,
  }: IRequestCreateClient): Promise<Client> {
    const { repo } = this;

    const checkIfClientExists = await this.repo.findOne({ email });
    if (checkIfClientExists) {
      throw new ErrorHandler('client already exists', 400);
    }

    const newClient = await repo.create({
      last_name, phone, company_id, cpf, email, first_name,
    });

    return newClient;
  }
}

export { CreateClientUseCase };
