import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCompany1626544013793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'companies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'fantasy_name',
            type: 'varchar',
          },
          {
            name: 'CNPJ',
            type: 'varchar',
          },
          {
            name: 'adress',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'plan_id',
            type: 'uuid',
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
            name: 'FKplan',
            referencedTableName: 'plans',
            referencedColumnNames: ['id'],
            columnNames: ['plan_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('companies', true);
  }
}
