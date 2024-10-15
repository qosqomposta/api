import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728961754184 implements MigrationInterface {
    name = 'Migration1728961754184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pickup_day" ALTER COLUMN "dayOfWeek" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_040d4d92b5bf63a5406f9be65e2"`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_7e51aeee1a9c2f845ad3ffe5858"`);
        await queryRunner.query(`ALTER TABLE "courier" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "courier" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ALTER COLUMN "date_received" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP COLUMN "waste_weight"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD "waste_weight" numeric(6,2)`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP COLUMN "peso_balde"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD "peso_balde" numeric(6,2) DEFAULT '0.8'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "customer_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_4da2b83be276e342edd06540aad"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_d70cc5c53f80de6e354891fcd11"`);
        await queryRunner.query(`ALTER TABLE "family" ALTER COLUMN "family_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "family" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_dbc63f0d3d38f0d634ae9898758"`);
        await queryRunner.query(`ALTER TABLE "subscription" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "service_pricing" DROP CONSTRAINT "FK_58d40ad131efcf8e0666c8eb162"`);
        await queryRunner.query(`ALTER TABLE "waste_service" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "waste_service" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "waste_service_items" DROP CONSTRAINT "FK_b41e641a2c8573e4b9da1b35899"`);
        await queryRunner.query(`ALTER TABLE "waste_service_days" DROP CONSTRAINT "FK_28ae5d6ff159010a5fd5efb5159"`);
        await queryRunner.query(`ALTER TABLE "service_pricing" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "service_pricing" ALTER COLUMN "price" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "district" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "subscription_services" ALTER COLUMN "subscriptionId" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "subscription_services" ALTER COLUMN "servicePricingId" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_dbc63f0d3d38f0d634ae9898758" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_7e51aeee1a9c2f845ad3ffe5858" FOREIGN KEY ("courier_id") REFERENCES "courier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_4da2b83be276e342edd06540aad" FOREIGN KEY ("family_id") REFERENCES "family"("family_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_d70cc5c53f80de6e354891fcd11" FOREIGN KEY ("family_id") REFERENCES "family"("family_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_040d4d92b5bf63a5406f9be65e2" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_pricing" ADD CONSTRAINT "FK_58d40ad131efcf8e0666c8eb162" FOREIGN KEY ("wasteServiceId") REFERENCES "waste_service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription_services" ADD CONSTRAINT "FK_2b2ee890e664ac6d23df3cd2978" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "subscription_services" ADD CONSTRAINT "FK_1887827c207f3f22db8d9650c2f" FOREIGN KEY ("servicePricingId") REFERENCES "service_pricing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "waste_service_items" ADD CONSTRAINT "FK_b41e641a2c8573e4b9da1b35899" FOREIGN KEY ("servicePricingId") REFERENCES "service_pricing"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "waste_service_days" ADD CONSTRAINT "FK_28ae5d6ff159010a5fd5efb5159" FOREIGN KEY ("servicePricingId") REFERENCES "service_pricing"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "waste_service_days" DROP CONSTRAINT "FK_28ae5d6ff159010a5fd5efb5159"`);
        await queryRunner.query(`ALTER TABLE "waste_service_items" DROP CONSTRAINT "FK_b41e641a2c8573e4b9da1b35899"`);
        await queryRunner.query(`ALTER TABLE "subscription_services" DROP CONSTRAINT "FK_1887827c207f3f22db8d9650c2f"`);
        await queryRunner.query(`ALTER TABLE "subscription_services" DROP CONSTRAINT "FK_2b2ee890e664ac6d23df3cd2978"`);
        await queryRunner.query(`ALTER TABLE "service_pricing" DROP CONSTRAINT "FK_58d40ad131efcf8e0666c8eb162"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_040d4d92b5bf63a5406f9be65e2"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_d70cc5c53f80de6e354891fcd11"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_4da2b83be276e342edd06540aad"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_7e51aeee1a9c2f845ad3ffe5858"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP CONSTRAINT "FK_dbc63f0d3d38f0d634ae9898758"`);
        await queryRunner.query(`ALTER TABLE "subscription_services" ALTER COLUMN "servicePricingId" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "subscription_services" ALTER COLUMN "subscriptionId" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "district" ALTER COLUMN "name" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "service_pricing" ALTER COLUMN "price" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "service_pricing" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "waste_service_days" ADD CONSTRAINT "FK_28ae5d6ff159010a5fd5efb5159" FOREIGN KEY ("servicePricingId") REFERENCES "service_pricing"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "waste_service_items" ADD CONSTRAINT "FK_b41e641a2c8573e4b9da1b35899" FOREIGN KEY ("servicePricingId") REFERENCES "service_pricing"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "waste_service" ALTER COLUMN "name" SET DEFAULT 'waste service'`);
        await queryRunner.query(`ALTER TABLE "waste_service" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "service_pricing" ADD CONSTRAINT "FK_58d40ad131efcf8e0666c8eb162" FOREIGN KEY ("wasteServiceId") REFERENCES "waste_service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_dbc63f0d3d38f0d634ae9898758" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "family" ALTER COLUMN "name" SET DEFAULT 'family name'`);
        await queryRunner.query(`ALTER TABLE "family" ALTER COLUMN "family_id" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_d70cc5c53f80de6e354891fcd11" FOREIGN KEY ("family_id") REFERENCES "family"("family_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_4da2b83be276e342edd06540aad" FOREIGN KEY ("family_id") REFERENCES "family"("family_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "name" SET DEFAULT 'customer name'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "customer_id" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP COLUMN "peso_balde"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD "peso_balde" double precision DEFAULT '0.8'`);
        await queryRunner.query(`ALTER TABLE "delivery_order" DROP COLUMN "waste_weight"`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD "waste_weight" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ALTER COLUMN "date_received" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "courier" ALTER COLUMN "name" SET DEFAULT 'courier name'`);
        await queryRunner.query(`ALTER TABLE "courier" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "delivery_order" ADD CONSTRAINT "FK_7e51aeee1a9c2f845ad3ffe5858" FOREIGN KEY ("courier_id") REFERENCES "courier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "name" SET DEFAULT 'Default Company Name'`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_040d4d92b5bf63a5406f9be65e2" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pickup_day" ALTER COLUMN "dayOfWeek" DROP NOT NULL`);
    }

}
