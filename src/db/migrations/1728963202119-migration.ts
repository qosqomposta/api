import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728963202119 implements MigrationInterface {
    name = 'Migration1728963202119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery_order" ALTER COLUMN "peso_balde" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ALTER COLUMN "peso_balde" SET DEFAULT '0.8'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery_order" ALTER COLUMN "peso_balde" SET DEFAULT 0.8`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ALTER COLUMN "peso_balde" DROP NOT NULL`);
    }

}
