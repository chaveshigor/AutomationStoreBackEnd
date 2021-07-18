import { getCustomRepository } from 'typeorm';

import { Company } from '../../../../models/Company';
import { CompaniesRepository } from '../../repositories/companiesRepository';

interface IRequest{
    name: string
    fantasy_name: string
    cnpj: string
    phone: string
    adress: string
    email: string
    plan_id: string
}

class CreateCompanyUseCase {
  async execute({
    name, fantasy_name, cnpj, phone, email, plan_id, adress,
  }: IRequest): Promise<Company> {
    const repo = getCustomRepository(CompaniesRepository);

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
