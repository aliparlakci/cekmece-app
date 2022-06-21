import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderInvoiceNullable1655807754992 implements MigrationInterface {
    name = 'OrderInvoiceNullable1655807754992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`invoice\` \`invoice\` blob NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`invoice\` \`invoice\` blob NOT NULL`);
    }

}
