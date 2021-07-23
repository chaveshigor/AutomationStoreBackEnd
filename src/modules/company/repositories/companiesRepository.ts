import {
  EntityRepository, Repository, getRepository,
} from 'typeorm';

import { Company } from '../../../models/Company';
import { IRequestCreateCompany } from '../interfaces';
import { ICompaniesRepository, IParams } from './ICompaniesRepository';

@EntityRepository(Company)
class CompaniesRepository implements ICompaniesRepository {
  private repo: Repository<Company>

  constructor() {
    this.repo = getRepository(Company);
  }

  async create(
    {
      adress, email, phone, plan_id, CNPJ, fantasy_name, name,
    }
      : IRequestCreateCompany,
  ): Promise<Company> {
    const newCompany = this.repo.create({
      adress,
      email,
      phone,
      plan_id,
      CNPJ,
      fantasy_name,
      name,
    });
    await this.repo.save(newCompany);

    return newCompany;
  }

  async findOne(where: IParams): Promise<Company | undefined> {
    const company = await this.repo.findOne({
      where,
    });

    return company;
  }

  async update(companyToUpdate: IParams, companyData: IParams): Promise<Company | undefined> {
    await this.repo.update(companyToUpdate, companyData);
    const company = await this.repo.findOne({ where: companyToUpdate });

    return company;
  }

  async delete(params: IParams): Promise<void> {
    await this.repo.delete(params);
  }
}

export { CompaniesRepository };
