import { injectable, inject } from 'tsyringe';

import { Company } from '../../../../models/Company';
import { IRequestChangePlan } from '../../interfaces';
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';

@injectable()
class ChangePlanUseCase {
  constructor(
    @inject('PlansRepository')
    private repo: ICompaniesRepository,
  ) {}

  async execute({ cnpj, plan_id }: IRequestChangePlan): Promise<Company | undefined> {
    const company = await this.repo.update({ CNPJ: cnpj }, {
      plan_id,
    });

    return company;
  }
}

export { ChangePlanUseCase };
