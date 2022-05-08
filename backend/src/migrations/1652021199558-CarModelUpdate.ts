import { MigrationInterface, QueryRunner } from "typeorm";

export class CarModelUpdate1652021199558 implements MigrationInterface {
    name = 'CarModelUpdate1652021199558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car\` ADD \`description\` varchar(1000) NOT NULL DEFAULT 'Temporary description.'`);
        await queryRunner.query(`ALTER TABLE \`car\` ADD \`photoUrl\` varchar(255) NOT NULL DEFAULT 'https://i.imgur.com/awxaf0x.png'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car\` DROP COLUMN \`photoUrl\``);
        await queryRunner.query(`ALTER TABLE \`car\` DROP COLUMN \`description\``);
    }

}
