import { Module } from '@nestjs/common';
import { PickupDayService } from './pickup-day.service';
import { PickupDayController } from './pickup-day.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickupDay } from './entities/pickup-day.entity';
import { WasteService } from 'src/waste-service/entities/waste-service.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PickupDay, WasteService])],
    controllers: [PickupDayController],
    providers: [PickupDayService],
})
export class PickupDayModule {}
