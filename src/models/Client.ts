import {
  Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Company } from './Company';

@Entity('clients')
class Client {
    @PrimaryColumn()
    id: string

    // @ManyToMany(() => Company)
    // @JoinTable()
    // company: Company[]

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    phone: string

    @Column()
    email: string

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

export { Client };
