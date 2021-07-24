import { inject, injectable } from 'tsyringe';

import { Company } from '../../../../models/Company';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { IRequestCreateCompany } from '../../interfaces';
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';

@injectable()
class CreateCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private repo: ICompaniesRepository,
  ) {}

  async execute({
    name, fantasy_name, CNPJ, phone, email, plan_id, adress,
  }: IRequestCreateCompany): Promise<Company> {
    const { repo } = this;

    const checkIfCompanyExists = await repo.findOne({ CNPJ });
    if (checkIfCompanyExists) {
      throw new ErrorHandler('company already exists', 400);
    }

    const newCompany = repo.create({
      name,
      CNPJ,
      fantasy_name,
      phone,
      email,
      plan_id,
      adress,
    });

    return newCompany;
  }
}

export { CreateCompanyUseCase };
