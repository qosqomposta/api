import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729228744767 implements MigrationInterface {
    name = 'Migration1729228744767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_pricing" DROP COLUMN "isAddon"`);
        await queryRunner.query(`ALTER TABLE "service_pricing" ADD "isAddon" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_pricing" DROP COLUMN "isAddon"`);
        await queryRunner.query(`ALTER TABLE "service_pricing" ADD "isAddon" integer`);
    }

}
