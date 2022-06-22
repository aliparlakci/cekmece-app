import { MigrationInterface, QueryRunner } from "typeorm";

export class refundJoinColumn1655925598508 implements MigrationInterface {
    name = 'refundJoinColumn1655925598508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`refund_request\` ADD \`orderItemId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`refund_request\` ADD UNIQUE INDEX \`IDX_79e723fa720138553b7863ceb3\` (\`orderItemId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_79e723fa720138553b7863ceb3\` ON \`refund_request\` (\`orderItemId\`)`);
        await queryRunner.query(`ALTER TABLE \`refund_request\` ADD CONSTRAINT \`FK_79e723fa720138553b7863ceb33\` FOREIGN KEY (\`orderItemId\`) REFERENCES \`order_item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`refund_request\` DROP FOREIGN KEY \`FK_79e723fa720138553b7863ceb33\``);
        await queryRunner.query(`DROP INDEX \`REL_79e723fa720138553b7863ceb3\` ON \`refund_request\``);
        await queryRunner.query(`ALTER TABLE \`refund_request\` DROP INDEX \`IDX_79e723fa720138553b7863ceb3\``);
        await queryRunner.query(`ALTER TABLE \`refund_request\` DROP COLUMN \`orderItemId\``);
    }

}
