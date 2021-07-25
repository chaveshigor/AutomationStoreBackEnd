import {
  Column, CreateDateColumn, Entity, PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('tokens_to_recover_password')
class Token {
    @PrimaryColumn()
    id: string

    @Column()
    user_id: string

    @Column()
    token: string

    @Column()
    expire_at: Date

    @CreateDateColumn()
    created_at: Date

    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
}

export { Token };
