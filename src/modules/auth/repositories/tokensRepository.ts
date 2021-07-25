import { hash } from 'bcrypt';
import { getRepository, Repository } from 'typeorm';

import { Token } from '../../../models/Token';
import { ITokensRepository } from './ITokensRepository';

class TokensRepository implements ITokensRepository {
    private repo: Repository<Token>
    constructor() {
      this.repo = getRepository(Token);
    }

    async create(id: string): Promise<Token> {
      function sumHoursToDate(hours: number):Date {
        const currentTime = new Date();
        const expiration_time = new Date(currentTime.setHours(currentTime.getHours() + hours));

        return expiration_time;
      }

      const randomNumber = Math.random().toString();
      const tokenHash = await hash(randomNumber, 10);
      const token = this.repo.create({
        user_id: id,
        token: tokenHash,
        expire_at: sumHoursToDate(3),
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
