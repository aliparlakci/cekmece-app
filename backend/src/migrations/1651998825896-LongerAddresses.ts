import { MigrationInterface, QueryRunner } from "typeorm";

export class LongerAddresses1651998825896 implements MigrationInterface {
    name = 'LongerAddresses1651998825896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_548db341fcb171a46726b5d041\` ON \`review\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`addressLine1\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`addressLine1\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`addressLine2\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`addressLine2\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`city\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`city\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`province\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`province\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`country\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`country\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`country\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`country\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`province\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`province\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`city\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`city\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`addressLine2\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`addressLine2\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`addressLine1\``);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`addressLine1\` varchar(50) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_548db341fcb171a46726b5d041\` ON \`review\` (\`orderItemId\`)`);
    }

}
