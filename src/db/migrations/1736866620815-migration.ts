import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736866620815 implements MigrationInterface {
    name = 'Migration1736866620815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "firebaseUid" character varying`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_ace8425f3093aa5729e8f6cbf18" UNIQUE ("firebaseUid")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_ace8425f3093aa5729e8f6cbf18"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "firebaseUid"`);
    }

}
