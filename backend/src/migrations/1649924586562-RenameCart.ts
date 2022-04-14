import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameCart1649924586562 implements MigrationInterface {
    name = 'RenameCart1649924586562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_entity\` RENAME TO \`cart\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` RENAME TO \`cart_entity\``);
    }

}
