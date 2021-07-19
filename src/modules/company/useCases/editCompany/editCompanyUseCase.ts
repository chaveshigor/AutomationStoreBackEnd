import { getCustomRepository } from 'typeorm';

import { Company } from '../../../../models/Company';
import { IRequestEditCompany } from '../../interfaces';
import { CompaniesRepository } from '../../repositories/companiesRepository';

class EditCompanyUseCase {
  async execute({
    name, email, phone, adress, fantasy_name, cnpj,
  }: IRequestEditCompany): Promise<Company | undefined> {
    const repo = getCustomRepository(CompaniesRepository);
    await repo.update({ email }, {
      name,
      email,
      phone,
      adress,
      fantasy_name,
    });

    const company = await repo.findOne({
      where: { email },
    });

    return company;
  }
}

export { EditCompanyUseCase };
