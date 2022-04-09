import { MigrationInterface, QueryRunner } from "typeorm";

export class Cart1649539460729 implements MigrationInterface {
    name = 'Cart1649539460729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cart_entity\` (\`id\` varchar(36) NOT NULL, \`total\` int NOT NULL, \`quantity\` int NOT NULL, \`itemId\` int NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cart_entity\` ADD CONSTRAINT \`FK_75b7cfe1914e491b926ace6cf3e\` FOREIGN KEY (\`itemId\`) REFERENCES \`car\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_entity\` ADD CONSTRAINT \`FK_8edda4b36869b45de9624747e8a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_entity\` DROP FOREIGN KEY \`FK_8edda4b36869b45de9624747e8a\``);
        await queryRunner.query(`ALTER TABLE \`cart_entity\` DROP FOREIGN KEY \`FK_75b7cfe1914e491b926ace6cf3e\``);
        await queryRunner.query(`DROP TABLE \`cart_entity\``);
    }

}
