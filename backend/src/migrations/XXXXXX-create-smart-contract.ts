import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateSmartContractXXXXXX implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'smart_contract',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'originalAddress',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'shortId',
            type: 'varchar',
            length: '50',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'expiresAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'smart_contract',
      new TableIndex({
        name: 'IDX_SMART_CONTRACT_ORIGINAL_ADDRESS',
        columnNames: ['originalAddress'],
      }),
    );

    await queryRunner.createIndex(
      'smart_contract',
      new TableIndex({
        name: 'IDX_SMART_CONTRACT_SHORT_ID',
        columnNames: ['shortId'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('smart_contract');
  }
}
