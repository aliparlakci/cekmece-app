import { MigrationInterface, QueryRunner } from "typeorm";

export class orderItemDiscount1655838672118 implements MigrationInterface {
    name = 'orderItemDiscount1655838672118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`status\` enum ('processing', 'in-transit', 'delivered') NOT NULL DEFAULT 'processing'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`status\``);
    }

}
