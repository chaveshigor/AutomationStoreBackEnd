import { Transporter } from '../../../models/Transporter';

interface ITransportersRepository {
    findById(transporter_id: string): Promise<Transporter | undefined>
    create(name: string): Promise<Transporter>
    editName(transporter_id: string, new_name: string): Promise<Transporter>
}

export { ITransportersRepository };
