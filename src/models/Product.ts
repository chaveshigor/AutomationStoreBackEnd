import {
  Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Company } from './Company';

@Entity('products')
class Product {
    @PrimaryColumn()
    id: string

    @Column()
    product: string

    @Column()
    price: number

    @Column()
    company_id: string

    @JoinColumn({ name: 'company_id' })
    @ManyToOne(() => Company)
    company_product: Company

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

export { Product };
