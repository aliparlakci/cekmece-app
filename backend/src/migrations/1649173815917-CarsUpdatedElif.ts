import { MigrationInterface, QueryRunner } from "typeorm";

export class CarsUpdatedElif1649173815917 implements MigrationInterface {
    name = 'CarsUpdatedElif1649173815917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car\` ADD \`unitsSold\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`car\` ADD \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`car\` ADD CONSTRAINT \`FK_0cf42901253ea72db9ca703383d\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car\` DROP FOREIGN KEY \`FK_0cf42901253ea72db9ca703383d\``);
        await queryRunner.query(`ALTER TABLE \`car\` DROP COLUMN \`categoryId\``);
        await queryRunner.query(`ALTER TABLE \`car\` DROP COLUMN \`unitsSold\``);
    }

}
