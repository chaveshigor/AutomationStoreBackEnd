import {
  Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Plan } from './Plan';

@Entity('users')
class User {
    @PrimaryColumn()
    id?: string

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    plan_id: string

    @CreateDateColumn()
    created_at?: Date

    @UpdateDateColumn()
    updated_at?: Date

    @ManyToOne((type) => Plan, (plan) => plan)
    plan?: Plan

    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
}

export { User };
