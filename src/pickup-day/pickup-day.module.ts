import { Module } from '@nestjs/common';
import { PickupDayService } from './pickup-day.service';
import { PickupDayController } from './pickup-day.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickupDay } from './entities/pickup-day.entity';
import { WasteService } from 'src/waste-service/entities/waste-service.entity';
import { PlacePickup } from 'src/place-pickup/entities/place-pickup.entity';
import { PlacePickupService } from 'src/place-pickup/place-pickup.service';

@Module({
    imports: [TypeOrmModule.forFeature([PickupDay, WasteService, PlacePickup])],
    controllers: [PickupDayController],
    providers: [PickupDayService, PlacePickupService],
})
export class PickupDayModule {}
