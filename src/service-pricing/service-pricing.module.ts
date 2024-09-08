import { Module } from '@nestjs/common';
import { ServicePricingService } from './service-pricing.service';
import { ServicePricingController } from './service-pricing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicePricing } from './entities/service-pricing.entity';
import { PickupItemModule } from 'src/pickup-item/pickup-item.module';
import { PickupDayModule } from 'src/pickup-day/pickup-day.module';
import { PickupItem } from 'src/pickup-item/entities/pickup-item.entity';
import { PickupDay } from 'src/pickup-day/entities/pickup-day.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ServicePricing, PickupItem, PickupDay]),
        PickupItemModule,
        PickupDayModule,
    ],
    controllers: [ServicePricingController],
    providers: [ServicePricingService],
    exports: [ServicePricingService],
})
export class ServicePricingModule {}
