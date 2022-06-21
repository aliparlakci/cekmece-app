import { MigrationInterface, QueryRunner } from "typeorm";

export class SoftDeleteCascade1655813672845 implements MigrationInterface {
    name = 'SoftDeleteCascade1655813672845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wishlist_item\` ADD \`deletedAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wishlist_item\` DROP COLUMN \`deletedAt\``);
    }

}
