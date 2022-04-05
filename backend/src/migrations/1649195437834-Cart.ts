import { MigrationInterface, QueryRunner } from "typeorm";

export class Cart1649195437834 implements MigrationInterface {
    name = 'Cart1649195437834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`distributor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cart\` (\`id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`review\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rating\` tinyint NOT NULL DEFAULT '3', \`comment\` varchar(1000) NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`isApproved\` tinyint NOT NULL DEFAULT 0, \`carId\` int NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`car\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`model\` int NOT NULL, \`number\` int NOT NULL, \`quantity\` int NOT NULL, \`price\` int NOT NULL, \`warranty\` int NOT NULL, \`distributorId\` int NULL, FULLTEXT INDEX \`IDX_27f0e938a6329d73630f5e52a7\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`car_categories_category\` (\`carId\` int NOT NULL, \`categoryId\` int NOT NULL, INDEX \`IDX_71d04bb1c4fc8ae9ab88f1387c\` (\`carId\`), INDEX \`IDX_da8b0c861eeb127563877906e2\` (\`categoryId\`), PRIMARY KEY (\`carId\`, \`categoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_a486d511114d8c1610818c33109\` FOREIGN KEY (\`carId\`) REFERENCES \`car\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_1337f93918c70837d3cea105d39\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`car\` ADD CONSTRAINT \`FK_4258cd751aac8dd581695ea6e51\` FOREIGN KEY (\`distributorId\`) REFERENCES \`distributor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`car_categories_category\` ADD CONSTRAINT \`FK_71d04bb1c4fc8ae9ab88f1387c2\` FOREIGN KEY (\`carId\`) REFERENCES \`car\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`car_categories_category\` ADD CONSTRAINT \`FK_da8b0c861eeb127563877906e26\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car_categories_category\` DROP FOREIGN KEY \`FK_da8b0c861eeb127563877906e26\``);
        await queryRunner.query(`ALTER TABLE \`car_categories_category\` DROP FOREIGN KEY \`FK_71d04bb1c4fc8ae9ab88f1387c2\``);
        await queryRunner.query(`ALTER TABLE \`car\` DROP FOREIGN KEY \`FK_4258cd751aac8dd581695ea6e51\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_1337f93918c70837d3cea105d39\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_a486d511114d8c1610818c33109\``);
        await queryRunner.query(`DROP INDEX \`IDX_da8b0c861eeb127563877906e2\` ON \`car_categories_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_71d04bb1c4fc8ae9ab88f1387c\` ON \`car_categories_category\``);
        await queryRunner.query(`DROP TABLE \`car_categories_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_27f0e938a6329d73630f5e52a7\` ON \`car\``);
        await queryRunner.query(`DROP TABLE \`car\``);
        await queryRunner.query(`DROP TABLE \`review\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`cart\``);
        await queryRunner.query(`DROP TABLE \`distributor\``);
        await queryRunner.query(`DROP TABLE \`category\``);
    }

}
