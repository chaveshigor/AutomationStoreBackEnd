import { Plan } from '../../../models/Plan';

interface INewPlanRequest {
    name: string
    price: number
}

interface IName {
    name?: string
    id?: string
}

interface IWhere {
    where: IName
}

interface IPlansRepository {
    create({ name, price }: INewPlanRequest): Plan
    save(plan: Plan): Promise<Plan>
    findOne(where: IWhere): Promise<Plan | undefined>
}

export { IPlansRepository };
