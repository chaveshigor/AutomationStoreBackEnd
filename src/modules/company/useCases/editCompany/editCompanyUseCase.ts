import { inject, injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

import { Company } from '../../../../models/Company';
import { IRequestEditCompany } from '../../interfaces';
import { CompaniesRepository } from '../../repositories/companiesRepository';
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';

@injectable()
class EditCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private repo: ICompaniesRepository,
  ) {}

  async execute({
    name, email, phone, adress, fantasy_name,
  }: IRequestEditCompany): Promise<Company | undefined> {
    const repo = getCustomRepository(CompaniesRepository);
    const company = await repo.update({ email }, {
      name,
      email,
      phone,
      adress,
      fantasy_name,
    });

    return company;
  }
}

export { EditCompanyUseCase };
