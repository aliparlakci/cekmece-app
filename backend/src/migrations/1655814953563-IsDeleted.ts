import { MigrationInterface, QueryRunner } from "typeorm";

export class IsDeleted1655814953563 implements MigrationInterface {
    name = 'IsDeleted1655814953563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`isDeleted\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`car\` ADD \`isDeleted\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car\` DROP COLUMN \`isDeleted\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`isDeleted\``);
    }

}
