import { MigrationInterface, QueryRunner } from "typeorm";

export class refund1655932457220 implements MigrationInterface {
    name = 'refund1655932457220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`refund_request\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isApproved\` tinyint NOT NULL DEFAULT 0, \`isRejected\` tinyint NOT NULL DEFAULT 0, \`orderItemId\` int NULL, UNIQUE INDEX \`REL_79e723fa720138553b7863ceb3\` (\`orderItemId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`refund_request\` ADD CONSTRAINT \`FK_79e723fa720138553b7863ceb33\` FOREIGN KEY (\`orderItemId\`) REFERENCES \`order_item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`refund_request\` DROP FOREIGN KEY \`FK_79e723fa720138553b7863ceb33\``);
        await queryRunner.query(`DROP INDEX \`REL_79e723fa720138553b7863ceb3\` ON \`refund_request\``);
        await queryRunner.query(`DROP TABLE \`refund_request\``);
    }

}
