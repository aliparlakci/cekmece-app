import { MigrationInterface, QueryRunner } from "typeorm";

export class IsDeleted1655815037646 implements MigrationInterface {
    name = 'IsDeleted1655815037646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car\` CHANGE \`isDeleted\` \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car\` CHANGE \`isDeleted\` \`isDeleted\` tinyint NOT NULL`);
    }

}
