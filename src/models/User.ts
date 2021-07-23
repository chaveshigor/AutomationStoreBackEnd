import {
  Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Company } from './Company';

@Entity('users')
class User {
    @PrimaryColumn()
    id: string

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    company_id: string

    @JoinColumn({ name: 'company_id' })
    @ManyToOne(() => Company)
    user_company: Company

    @Column()
    admin: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
}

export { User };
