import {
  Column, CreateDateColumn, Entity, PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('product-status')
class ProductStatus {
      @PrimaryColumn()
      id: string

      @Column()
      product_id: string

      @Column()
      status: string

      @CreateDateColumn()
      created_at: string

      constructor() {
        if (!this.id) {
          this.id = uuid();
        }
      }
}

export { ProductStatus };
