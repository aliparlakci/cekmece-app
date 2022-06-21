import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderInvoice1655807544129 implements MigrationInterface {
    name = 'OrderInvoice1655807544129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`invoice\` blob NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`invoice\``);
    }

}
