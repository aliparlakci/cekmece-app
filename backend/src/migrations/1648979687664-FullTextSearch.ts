import { MigrationInterface, QueryRunner } from "typeorm";

export class FullTextSearch1648979687664 implements MigrationInterface {
    name = 'FullTextSearch1648979687664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE FULLTEXT INDEX \`IDX_27f0e938a6329d73630f5e52a7\` ON \`car\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_27f0e938a6329d73630f5e52a7\` ON \`car\``);
    }

}
