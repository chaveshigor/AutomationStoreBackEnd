import { Plan } from '../../../models/Plan';

interface INewPlanRequest {
    name: string
    price: number
}

interface IParams {
    id?: string
    name?: string
    price?: number
}

interface IPlansRepository {
    create({ name, price }: INewPlanRequest): Promise<Plan>
    findOne(where: IParams): Promise<Plan | undefined>
    update(planToUpdate: IParams, planData: IParams): Promise<Plan | undefined>
    list():Promise<Plan[]>
}

export { IPlansRepository, IParams };
