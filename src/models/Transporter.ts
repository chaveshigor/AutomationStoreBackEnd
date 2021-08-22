import {
  Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('transporters')
class Transporter {
    @PrimaryColumn()
    id?: string

    @Column()
    name: string

    @CreateDateColumn()
    created_at?: string

    @UpdateDateColumn()
    updated_at?: string

    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
}

export { Transporter };
