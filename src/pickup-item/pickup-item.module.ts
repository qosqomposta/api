import { Module } from '@nestjs/common';
import { PickupItemService } from './pickup-item.service';
import { PickupItemController } from './pickup-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickupItem } from './entities/pickup-item.entity';
import { WasteService } from 'src/waste-service/entities/waste-service.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PickupItem, WasteService])],
    controllers: [PickupItemController],
    providers: [PickupItemService],
})
export class PickupItemModule {}
