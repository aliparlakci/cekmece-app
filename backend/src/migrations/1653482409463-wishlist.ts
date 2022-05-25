import { MigrationInterface, QueryRunner } from "typeorm";

export class wishlist1653482409463 implements MigrationInterface {
    name = 'wishlist1653482409463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`wishlist_item\` (\`id\` varchar(36) NOT NULL, \`itemId\` int NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`wishlist_item\` ADD CONSTRAINT \`FK_8cc6207f0fbb6331bf859228b18\` FOREIGN KEY (\`itemId\`) REFERENCES \`car\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`wishlist_item\` ADD CONSTRAINT \`FK_8ce82e87865ca27e08b492e05ac\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wishlist_item\` DROP FOREIGN KEY \`FK_8ce82e87865ca27e08b492e05ac\``);
        await queryRunner.query(`ALTER TABLE \`wishlist_item\` DROP FOREIGN KEY \`FK_8cc6207f0fbb6331bf859228b18\``);
        await queryRunner.query(`DROP TABLE \`wishlist_item\``);
    }

}
