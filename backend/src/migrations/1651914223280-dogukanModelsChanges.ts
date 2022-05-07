import { MigrationInterface, QueryRunner } from "typeorm";

export class dogukanModelsChanges1651914223280 implements MigrationInterface {
    name = 'dogukanModelsChanges1651914223280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`subTotal\` int NOT NULL, \`shipping\` int NOT NULL DEFAULT '0', \`discount\` int NOT NULL DEFAULT '0', \`total\` int NOT NULL, \`status\` enum ('processing', 'in-transit', 'delivered') NOT NULL DEFAULT 'processing', \`promoCode\` varchar(50) NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`addressLine1\` varchar(50) NOT NULL, \`addressLine2\` varchar(50) NULL, \`city\` varchar(50) NOT NULL, \`province\` varchar(50) NULL, \`zipCode\` int NOT NULL, \`country\` varchar(50) NOT NULL, \`shippingOption\` enum ('free', 'one-day') NOT NULL DEFAULT 'free', \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_item\` (\`id\` varchar(36) NOT NULL, \`total\` int NOT NULL, \`quantity\` int NOT NULL, \`carId\` int NULL, \`orderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`orderItemId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD UNIQUE INDEX \`IDX_548db341fcb171a46726b5d041\` (\`orderItemId\`)`);
        await queryRunner.query(`ALTER TABLE \`car\` ADD \`reviewCount\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`car\` ADD \`averageRating\` decimal(3,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_548db341fcb171a46726b5d041\` ON \`review\` (\`orderItemId\`)`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_78a85e3123f5448debb6c94babb\` FOREIGN KEY (\`carId\`) REFERENCES \`car\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_548db341fcb171a46726b5d041c\` FOREIGN KEY (\`orderItemId\`) REFERENCES \`order_item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_548db341fcb171a46726b5d041c\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_78a85e3123f5448debb6c94babb\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`DROP INDEX \`REL_548db341fcb171a46726b5d041\` ON \`review\``);
        await queryRunner.query(`ALTER TABLE \`car\` DROP COLUMN \`averageRating\``);
        await queryRunner.query(`ALTER TABLE \`car\` DROP COLUMN \`reviewCount\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP INDEX \`IDX_548db341fcb171a46726b5d041\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`orderItemId\``);
        await queryRunner.query(`DROP TABLE \`order_item\``);
        await queryRunner.query(`DROP TABLE \`order\``);
    }

}
