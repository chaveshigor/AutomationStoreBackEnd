import { v4 as uuid } from 'uuid';

import { Company } from '../../../../models/Company';

interface ICompany {
    id: string
    name: string
    fantasy_name: string
    CNPJ: string
    phone: string
    adress: string
    email: string
    plan_id: string
    company_plan: string
    created_at: Date
    updated_at: Date
}

interface IRequest {
    name: string
    fantasy_name: string
    cnpj: string
    phone: string
    adress: string
    email: string
    plan_id: string
}

class MockCompaniesRepository {
    private repository: ICompany[]

    constructor() {
      this.repository = [];
    }

    create({
      name, fantasy_name, cnpj, phone, adress, email, plan_id,
    }:IRequest): ICompany {
      const newCompany = {
        id: uuid(),
        name,
        fantasy_name,
        CNPJ: cnpj,
        phone,
        adress,
        email,
        plan_id,
        company_plan: plan_id,
        created_at: new Date(),
        updated_at: new Date(),
      };

      return newCompany;
    }
}

export { MockCompaniesRepository };
