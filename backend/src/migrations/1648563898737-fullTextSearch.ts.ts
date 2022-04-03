import { MigrationInterface, QueryRunner } from "typeorm";

export class fullTextSearch.ts1648563898737 implements MigrationInterface {
    name = 'fullTextSearch.ts1648563898737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE FULLTEXT INDEX \`IDX_27f0e938a6329d73630f5e52a7\` ON \`car\` (\`name\`)`);
        await queryRunner.query(`CREATE FULLTEXT INDEX \`IDX_4258cd751aac8dd581695ea6e5\` ON \`car\` (\`distributorId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_4258cd751aac8dd581695ea6e5\` ON \`car\``);
        await queryRunner.query(`DROP INDEX \`IDX_27f0e938a6329d73630f5e52a7\` ON \`car\``);
    }

}
