import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728961924505 implements MigrationInterface {
    name = 'Migration1728961924505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery_order" ALTER COLUMN "peso_balde" SET DEFAULT '0.8'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery_order" ALTER COLUMN "peso_balde" SET DEFAULT 0.8`);
    }

}
