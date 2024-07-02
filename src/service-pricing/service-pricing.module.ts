import { Module } from '@nestjs/common';
import { ServicePricingService } from './service-pricing.service';
import { ServicePricingController } from './service-pricing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicePricing } from './entities/service-pricing.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ServicePricing])],
    controllers: [ServicePricingController],
    providers: [ServicePricingService],
})
export class ServicePricingModule {}
