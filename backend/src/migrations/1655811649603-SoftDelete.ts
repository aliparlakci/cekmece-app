import { MigrationInterface, QueryRunner } from "typeorm";

export class SoftDelete1655811649603 implements MigrationInterface {
    name = 'SoftDelete1655811649603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`car\` ADD \`deletedAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`deletedAt\``);
    }

}
