import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ShippedProducts1629426950821 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shipped_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'uuid',
          },
          {
            name: 'transporter_id',
            type: 'uuid',
          },
          {
            name: 'purchase_date',
            type: 'timestamp',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKtransporterid',
            referencedTableName: 'transporters',
            referencedColumnNames: ['id'],
            columnNames: ['transporter_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shipped_products');
  }
}
