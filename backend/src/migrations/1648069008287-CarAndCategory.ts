import { MigrationInterface, QueryRunner } from "typeorm";

export class CarAndCategory1648069008287 implements MigrationInterface {
    name = 'CarAndCategory1648069008287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`car\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`number\` int NOT NULL, \`quantity\` int NOT NULL, \`price\` int NOT NULL, \`warranty\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`car_categories_category\` (\`carId\` int NOT NULL, \`categoryId\` int NOT NULL, INDEX \`IDX_71d04bb1c4fc8ae9ab88f1387c\` (\`carId\`), INDEX \`IDX_da8b0c861eeb127563877906e2\` (\`categoryId\`), PRIMARY KEY (\`carId\`, \`categoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`car_categories_category\` ADD CONSTRAINT \`FK_71d04bb1c4fc8ae9ab88f1387c2\` FOREIGN KEY (\`carId\`) REFERENCES \`car\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`car_categories_category\` ADD CONSTRAINT \`FK_da8b0c861eeb127563877906e26\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car_categories_category\` DROP FOREIGN KEY \`FK_da8b0c861eeb127563877906e26\``);
        await queryRunner.query(`ALTER TABLE \`car_categories_category\` DROP FOREIGN KEY \`FK_71d04bb1c4fc8ae9ab88f1387c2\``);
        await queryRunner.query(`DROP INDEX \`IDX_da8b0c861eeb127563877906e2\` ON \`car_categories_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_71d04bb1c4fc8ae9ab88f1387c\` ON \`car_categories_category\``);
        await queryRunner.query(`DROP TABLE \`car_categories_category\``);
        await queryRunner.query(`DROP TABLE \`car\``);
        await queryRunner.query(`DROP TABLE \`category\``);
    }

}
