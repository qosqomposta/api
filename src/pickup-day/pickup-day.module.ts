import { forwardRef, Module } from '@nestjs/common';
import { PickupDayService } from './pickup-day.service';
import { PickupDayController } from './pickup-day.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickupDay } from './entities/pickup-day.entity';
import { PlacePickup } from 'src/place-pickup/entities/place-pickup.entity';
import { PlacePickupModule } from 'src/place-pickup/place-pickup.module';
import { ServicePricing } from 'src/service-pricing/entities/service-pricing.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([PickupDay, ServicePricing, PlacePickup]),
        forwardRef(() => PlacePickupModule),
    ],
    controllers: [PickupDayController],
    providers: [PickupDayService],
    exports: [PickupDayService],
})
export class PickupDayModule {}
