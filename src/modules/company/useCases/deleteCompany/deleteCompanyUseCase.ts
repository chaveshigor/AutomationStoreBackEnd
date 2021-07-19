import { getCustomRepository } from 'typeorm';

import { CompaniesRepository } from '../../repositories/companiesRepository';

class DeleteCompanyUseCase {
  async execute(cnpj: string): Promise<void> {
    const repo = getCustomRepository(CompaniesRepository);

    await repo.delete({ CNPJ: cnpj });
  }
}

export { DeleteCompanyUseCase };
