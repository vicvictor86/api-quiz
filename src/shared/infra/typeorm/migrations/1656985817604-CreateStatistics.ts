import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStatistics1656985817604 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'statistics',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'question_id',
            type: 'uuid',
          },
          {
            name: 'alternative_id',
            type: 'uuid',
          },
          {
            name: 'hit',
            type: 'boolean',
          },
          {
            name: 'time_to_solve',
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
            name: 'ReferenceUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'ReferenceQuestions',
            referencedTableName: 'questions',
            referencedColumnNames: ['id'],
            columnNames: ['question_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'ReferenceAlternative',
            referencedTableName: 'alternatives',
            referencedColumnNames: ['id'],
            columnNames: ['alternative_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('statistics');
  }

}
