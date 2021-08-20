import { User } from '../../../models/User';

interface IParams {
    id?: string
    first_name?: string
    last_name?: string
    email?: string
    password?: string
    plan_id?: string
}

interface IUsersRepository {
    findOne(params: IParams): Promise<User | undefined>
    create(userData: IParams): Promise<User>
    updatePlan(user_id: string, new_plan_id: string): Promise<User | undefined>
    deleteById(user_id: string): Promise<void>
}

export { IUsersRepository, IParams };
