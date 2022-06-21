import { MigrationInterface, QueryRunner } from "typeorm";

export class categoryIsDeletedDefault1655839298980 implements MigrationInterface {
    name = 'categoryIsDeletedDefault1655839298980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`isDeleted\` \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`isDeleted\` \`isDeleted\` tinyint NOT NULL`);
    }

}
