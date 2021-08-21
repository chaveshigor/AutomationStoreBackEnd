import { Token } from '../../../models/Token';

interface ITokensRepository {
    create(id: string, token: string, expire_date: Date): Promise<Token>
    findByUserId(id: string): Promise<Token | undefined>
    deleteByUserId(id: string): Promise<void>
}

export { ITokensRepository };
