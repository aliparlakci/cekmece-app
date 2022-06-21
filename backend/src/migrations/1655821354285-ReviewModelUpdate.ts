import { MigrationInterface, QueryRunner } from "typeorm";

export class ReviewModelUpdate1655821354285 implements MigrationInterface {
    name = 'ReviewModelUpdate1655821354285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`isApproved\` \`approvalStatus\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`approvalStatus\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`approvalStatus\` enum ('in-progress', 'approved', 'disapproved') NOT NULL DEFAULT 'in-progress'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`approvalStatus\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`approvalStatus\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`approvalStatus\` \`isApproved\` tinyint NOT NULL DEFAULT '0'`);
    }

}
