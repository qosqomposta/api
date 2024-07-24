import { forwardRef, Module } from '@nestjs/common';
import { PlacePickupService } from './place-pickup.service';
import { PlacePickupController } from './place-pickup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacePickup } from './entities/place-pickup.entity';
import { PickupDay } from 'src/pickup-day/entities/pickup-day.entity';
import { WasteService } from 'src/waste-service/entities/waste-service.entity';
import { PickupDayModule } from 'src/pickup-day/pickup-day.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PlacePickup, PickupDay, WasteService]),
        forwardRef(() => PickupDayModule),
    ],
    controllers: [PlacePickupController],
    providers: [PlacePickupService],
    exports: [PlacePickupService],
})
export class PlacePickupModule {}
