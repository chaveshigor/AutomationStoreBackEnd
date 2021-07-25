import { Token } from '../../../models/Token';

interface ITokensRepository {
    create(id: string): Promise<Token>
    findByUserId(id: string): Promise<Token | undefined>
    deleteByUserId(id: string): Promise<void>
}

export { ITokensRepository };
