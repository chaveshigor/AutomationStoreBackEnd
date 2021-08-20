import {
  Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from './User';

@Entity('plans')
class Plan {
    @PrimaryColumn()
    id?: string

    @Column()
    name: string

    @Column()
    price: number

    @CreateDateColumn()
    created_at?: Date

    @UpdateDateColumn()
    updated_at?: Date

    @OneToMany((type) => User, (user) => user)
    users?: User[]

    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
}

export { Plan };
