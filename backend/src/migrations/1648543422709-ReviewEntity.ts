import { MigrationInterface, QueryRunner } from "typeorm";

export class ReviewEntity1648543422709 implements MigrationInterface {
    name = 'ReviewEntity1648543422709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`rating\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`rating\` tinyint NOT NULL DEFAULT '3'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`rating\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`rating\` enum ('1', '2', '3', '4', '5') NOT NULL DEFAULT '5'`);
    }

}
