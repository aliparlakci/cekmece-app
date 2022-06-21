import { MigrationInterface, QueryRunner } from "typeorm";

export class ReviewsModelUpdateFuckGoBackGoBack1655822789922 implements MigrationInterface {
    name = 'ReviewsModelUpdateFuckGoBackGoBack1655822789922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`approvalStatus\` \`isApproved\` enum ('in-progress', 'approved', 'disapproved') NOT NULL DEFAULT 'in-progress'`);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`isApproved\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`isApproved\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`isApproved\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`isApproved\` enum ('in-progress', 'approved', 'disapproved') NOT NULL DEFAULT 'in-progress'`);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`isApproved\` \`approvalStatus\` enum ('in-progress', 'approved', 'disapproved') NOT NULL DEFAULT 'in-progress'`);
    }

}
