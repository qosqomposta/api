import { Module } from '@nestjs/common';
import { PlacePickupService } from './place-pickup.service';
import { PlacePickupController } from './place-pickup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacePickup } from './entities/place-pickup.entity';
import { PickupDay } from 'src/pickup-day/entities/pickup-day.entity';
import { PickupDayService } from 'src/pickup-day/pickup-day.service';
import { WasteService } from 'src/waste-service/entities/waste-service.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PlacePickup, PickupDay, WasteService])],
    controllers: [PlacePickupController],
    providers: [PickupDayService, PlacePickupService],
})
export class PlacePickupModule {}
