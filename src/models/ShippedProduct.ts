import {
  Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('shipped_products')
class ShippedProduct {
    @PrimaryColumn()
    id?: string

    @Column()
    name: string

    @Column()
    transporter_id: string

    @Column()
    purchase_date: Date

    @CreateDateColumn()
    created_at?: Date

    @UpdateDateColumn()
    updated_at?: Date

    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
}

export { ShippedProduct };
