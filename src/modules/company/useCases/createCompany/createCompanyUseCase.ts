import { getCustomRepository } from 'typeorm';

import { ErrorHandler } from '../../../../ErrorHandler';
import { Company } from '../../../../models/Company';
import { IRequestCreateCompany } from '../../interfaces';
import { CompaniesRepository } from '../../repositories/companiesRepository';

class CreateCompanyUseCase {
  async execute({
    name, fantasy_name, cnpj, phone, email, plan_id, adress,
  }: IRequestCreateCompany): Promise<Company> {
    const repo = getCustomRepository(CompaniesRepository);

    const checkIfCompanyExists = await repo.findOne({
      where: { CNPJ: cnpj },
    });
    if (checkIfCompanyExists) {
      throw new ErrorHandler('company already exists', 400);
    }

    const newCompany = repo.create({
      name,
      CNPJ: cnpj,
      fantasy_name,
      phone,
      email,
      plan_id,
      adress,
    });

    await repo.save(newCompany);

    return newCompany;
  }
}

export { CreateCompanyUseCase };
