import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserQuestionAnswers1655351211302 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_questions_answers',
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
                        name: 'is_right',
                        type: 'boolean',
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
                        referencedColumnNames:['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'ReferenceQuestions',
                        referencedTableName: 'questions',
                        referencedColumnNames:['id'],
                        columnNames: ['question_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'ReferenceAlternative',
                        referencedTableName: 'alternatives',
                        referencedColumnNames:['id'],
                        columnNames: ['alternative_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_questions_answers');
    }

}
