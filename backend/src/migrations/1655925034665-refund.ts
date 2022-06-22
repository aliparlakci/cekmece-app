import { MigrationInterface, QueryRunner } from "typeorm";

export class refund1655925034665 implements MigrationInterface {
    name = 'refund1655925034665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`refund_request\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isApproved\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`status\` \`status\` enum ('processing', 'in-transit', 'delivered', 'cancelled', 'returned') NOT NULL DEFAULT 'processing'`);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`orderItemId\` \`orderItemId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_548db341fcb171a46726b5d041c\` FOREIGN KEY (\`orderItemId\`) REFERENCES \`order_item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_548db341fcb171a46726b5d041c\``);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`orderItemId\` \`orderItemId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` CHANGE \`status\` \`status\` enum ('processing', 'in-transit', 'delivered') NOT NULL DEFAULT 'processing'`);
        await queryRunner.query(`DROP TABLE \`refund_request\``);
    }

}
