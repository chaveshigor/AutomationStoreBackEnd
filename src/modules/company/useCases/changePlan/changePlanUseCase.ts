import { getCustomRepository } from 'typeorm';

import { Company } from '../../../../models/Company';
import { IRequestChangePlan } from '../../interfaces';
import { CompaniesRepository } from '../../repositories/companiesRepository';

class ChangePlanUseCase {
  async execute({ cnpj, plan_id }: IRequestChangePlan): Promise<Company | undefined> {
    const repo = getCustomRepository(CompaniesRepository);

    await repo.update({ CNPJ: cnpj }, {
      plan_id,
    });

    const company = await repo.findOne({ where: { CNPJ: cnpj } });

    return company;
  }
}

export { ChangePlanUseCase };
