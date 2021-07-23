import { User } from '../../../models/User';

interface IParams {
    id?: string
    first_name?: string
    last_name?: string
    email?: string
    password?: string
    admin?: boolean
    company_id?: string
}

interface IUsersRepository {
    findOne(params: IParams): Promise<User | undefined>
    create(userData: IParams): Promise<User>
    update(userToChange: IParams, userData: IParams): Promise<User | undefined>
}

export { IUsersRepository, IParams };
