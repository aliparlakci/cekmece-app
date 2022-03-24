import { MigrationInterface, QueryRunner } from "typeorm";

export class CarAndCategoryUpdated1648122428722 implements MigrationInterface {
    name = 'CarAndCategoryUpdated1648122428722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car\` DROP COLUMN \`model\``);
        await queryRunner.query(`ALTER TABLE \`car\` ADD \`model\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car\` DROP COLUMN \`model\``);
        await queryRunner.query(`ALTER TABLE \`car\` ADD \`model\` varchar(255) NOT NULL`);
    }

}
