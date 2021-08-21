import { hash } from 'bcrypt';
import { getRepository, Repository } from 'typeorm';

import { Token } from '../../../models/Token';
import { ITokensRepository } from './ITokensRepository';

class TokensRepository implements ITokensRepository {
    private repo: Repository<Token>
    constructor() {
      this.repo = getRepository(Token);
    }

    async create(id: string, tokenHash: string, expire_date: Date): Promise<Token> {
      const token = this.repo.create({
        user_id: id,
        token: tokenHash,
        expire_at: expire_date,
      });
      await this.repo.save(token);

      return token;
    }

    async findByUserId(id: string): Promise<Token | undefined> {
      const token = await this.repo.findOne({ user_id: id });

      return token;
    }

    async deleteByUserId(id: string): Promise<void> {
      await this.repo.delete({ user_id: id });
    }
}

export { TokensRepository };
