import { Module } from '@nestjs/common';
import { WasteServiceService } from './waste-service.service';
import { WasteServiceController } from './waste-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WasteService } from './entities/waste-service.entity';
import { PickupDay } from 'src/pickup-day/entities/pickup-day.entity';
import { PickupItem } from 'src/pickup-item/entities/pickup-item.entity';
import { PickupDayModule } from 'src/pickup-day/pickup-day.module';
import { PickupItemModule } from 'src/pickup-item/pickup-item.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([WasteService, PickupDay, PickupItem]),
        PickupDayModule,
        PickupItemModule,
    ],
    controllers: [WasteServiceController],
    providers: [WasteServiceService],
})
export class WasteServiceModule {}
