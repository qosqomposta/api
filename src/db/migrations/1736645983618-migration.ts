import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736645983618 implements MigrationInterface {
    name = 'Migration1736645983618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "district" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "district"`);
    }

}
