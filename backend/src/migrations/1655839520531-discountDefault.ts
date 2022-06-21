import { MigrationInterface, QueryRunner } from "typeorm";

export class discountDefault1655839520531 implements MigrationInterface {
    name = 'discountDefault1655839520531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car\` CHANGE \`discount\` \`discount\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car\` CHANGE \`discount\` \`discount\` int NOT NULL`);
    }

}
