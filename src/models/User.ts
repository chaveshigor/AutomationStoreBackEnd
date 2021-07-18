import {
  Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';

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
}

export { User };
