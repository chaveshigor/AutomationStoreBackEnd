import { Company } from '../../../models/Company';
import { IRequestCreateCompany } from '../interfaces';

interface IParams {
    id?: string
    name?: string
    fantasy_name?: string
    CNPJ?: string
    plan_id?: string
    email?: string
    phone?: string
    adress?: string
}

interface ICompaniesRepository {
    create(obj: IRequestCreateCompany): Promise<Company>
    findOne(where: IParams): Promise<Company | undefined>
    delete(params: IParams): Promise<void>
    update(companyToUpdate: IParams, companyData: IParams): Promise<Company | undefined>
}

export { ICompaniesRepository, IParams };
