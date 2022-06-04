import { MigrationInterface, QueryRunner } from "typeorm";

export class DiscountMigrate1654254553075 implements MigrationInterface {
    name = 'DiscountMigrate1654254553075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car\` ADD \`discount\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car\` DROP COLUMN \`discount\``);
    }

}
