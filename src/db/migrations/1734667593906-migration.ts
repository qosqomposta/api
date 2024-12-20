import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734667593906 implements MigrationInterface {
    name = 'Migration1734667593906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "family" ADD "district" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "family" DROP COLUMN "district"`);
    }

}
