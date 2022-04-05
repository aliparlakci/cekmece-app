import { MigrationInterface, QueryRunner } from "typeorm";

export class Cart1649195701475 implements MigrationInterface {
    name = 'Cart1649195701475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`cartId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_342497b574edb2309ec8c6b62a\` (\`cartId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_342497b574edb2309ec8c6b62a\` ON \`user\` (\`cartId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_342497b574edb2309ec8c6b62aa\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_342497b574edb2309ec8c6b62aa\``);
        await queryRunner.query(`DROP INDEX \`REL_342497b574edb2309ec8c6b62a\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_342497b574edb2309ec8c6b62a\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`cartId\``);
    }

}
