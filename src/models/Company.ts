import {
  Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Plan } from './Plan';

@Entity('companies')
class Company {
    @PrimaryColumn()
    readonly id: string

    @Column()
    name: string

    @Column()
    fantasy_name: string

    @Column()
    CNPJ: string

    @Column()
    adress:string

    @Column()
    phone: string

    @Column()
    email: string

    @Column()
    plan_id: string

    @JoinColumn({ name: 'plan_id' })
    @ManyToOne(() => Plan)
    company_plan: Plan

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

export { Company };
