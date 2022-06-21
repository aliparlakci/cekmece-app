import { MigrationInterface, QueryRunner } from "typeorm";

export class SoftDeleteCascade1655813883483 implements MigrationInterface {
    name = 'SoftDeleteCascade1655813883483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wishlist_item\` DROP FOREIGN KEY \`FK_8cc6207f0fbb6331bf859228b18\``);
        await queryRunner.query(`ALTER TABLE \`wishlist_item\` ADD CONSTRAINT \`FK_8cc6207f0fbb6331bf859228b18\` FOREIGN KEY (\`itemId\`) REFERENCES \`car\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wishlist_item\` DROP FOREIGN KEY \`FK_8cc6207f0fbb6331bf859228b18\``);
        await queryRunner.query(`ALTER TABLE \`wishlist_item\` ADD CONSTRAINT \`FK_8cc6207f0fbb6331bf859228b18\` FOREIGN KEY (\`itemId\`) REFERENCES \`car\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
