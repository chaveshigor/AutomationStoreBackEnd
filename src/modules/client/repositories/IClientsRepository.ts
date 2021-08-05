import { Client } from '../../../models/Client';
import { IFindOne, IRequestCreateClient, IUpdate } from '../interfaces';

interface IClientsRepository {
    create(userData: IRequestCreateClient): Promise<Client>
    findOne(userData: IFindOne): Promise<Client| undefined>
    findAllFromCompany(company_id: string): Promise<Client[]>
    updateById(id: string, user_data: IUpdate): Promise<Client>
    deleteById(id: string): Promise<void>
}

export { IClientsRepository };
