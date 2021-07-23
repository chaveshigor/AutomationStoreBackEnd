import { inject, injectable } from 'tsyringe';

import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';

@injectable()
class DeleteCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private repo: ICompaniesRepository,
  ) {}

  async execute(cnpj: string): Promise<void> {
    const { repo } = this;

    await repo.delete({ CNPJ: cnpj });
  }
}

export { DeleteCompanyUseCase };
