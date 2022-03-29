import { MigrationInterface, QueryRunner } from "typeorm";

export class ReviewEntity1648506903733 implements MigrationInterface {
    name = 'ReviewEntity1648506903733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_a486d511114d8c1610818c33109\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_1337f93918c70837d3cea105d39\``);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`comment\` \`comment\` varchar(1000) NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`carId\` \`carId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_a486d511114d8c1610818c33109\` FOREIGN KEY (\`carId\`) REFERENCES \`car\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_1337f93918c70837d3cea105d39\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_1337f93918c70837d3cea105d39\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_a486d511114d8c1610818c33109\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`userId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`carId\` \`carId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`comment\` \`comment\` varchar(1000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_1337f93918c70837d3cea105d39\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_a486d511114d8c1610818c33109\` FOREIGN KEY (\`carId\`) REFERENCES \`car\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
