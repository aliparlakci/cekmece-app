import { MigrationInterface, QueryRunner } from "typeorm";

export class ReviewEntity.ts1648244373898 implements MigrationInterface {
    name = 'ReviewEntity.ts1648244373898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`review\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rating\` enum ('1', '2', '3', '4', '5') NOT NULL DEFAULT '5', \`comment\` varchar(200) NOT NULL, \`date\` datetime NOT NULL, \`isApproved\` tinyint NOT NULL, \`userId\` int NOT NULL, \`carId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_a486d511114d8c1610818c33109\` FOREIGN KEY (\`carId\`) REFERENCES \`car\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_a486d511114d8c1610818c33109\``);
        await queryRunner.query(`DROP TABLE \`review\``);
    }

}
