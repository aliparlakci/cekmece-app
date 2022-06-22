import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderItemIntId1655892984444 implements MigrationInterface {
    name = 'OrderItemIntId1655892984444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_548db341fcb171a46726b5d041c\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`DROP INDEX \`REL_548db341fcb171a46726b5d041\` ON \`review\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`orderItemId\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`orderItemId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD UNIQUE INDEX \`IDX_548db341fcb171a46726b5d041\` (\`orderItemId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_548db341fcb171a46726b5d041\` ON \`review\` (\`orderItemId\`)`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_548db341fcb171a46726b5d041c\` FOREIGN KEY (\`orderItemId\`) REFERENCES \`order_item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_548db341fcb171a46726b5d041c\``);
        await queryRunner.query(`DROP INDEX \`REL_548db341fcb171a46726b5d041\` ON \`review\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP INDEX \`IDX_548db341fcb171a46726b5d041\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`orderItemId\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`orderItemId\` varchar(36) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_548db341fcb171a46726b5d041\` ON \`review\` (\`orderItemId\`)`);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_548db341fcb171a46726b5d041c\` FOREIGN KEY (\`orderItemId\`) REFERENCES \`order_item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
