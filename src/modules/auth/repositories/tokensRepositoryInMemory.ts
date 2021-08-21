import { hash } from 'bcrypt';

import { Token } from '../../../models/Token';
import { ITokensRepository } from './ITokensRepository';

class TokensRepositoryInMemory implements ITokensRepository {
  private repo: Token[]

  constructor() {
    this.repo = [];
  }

  async create(user_id: string, tokenHash: string, expire_date: Date): Promise<Token> {
    const token = new Token();
    Object.assign(token, {
      user_id,
      token: tokenHash,
      expire_at: expire_date,
    });

    this.repo.push(token);

    return token;
  }
  async findByUserId(id: string): Promise<Token | undefined> {
    return this.repo.find((token) => token.user_id === id);
  }
  async deleteByUserId(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { TokensRepositoryInMemory };
