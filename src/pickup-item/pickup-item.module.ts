import { Module } from '@nestjs/common';
import { PickupItemService } from './pickup-item.service';
import { PickupItemController } from './pickup-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickupItem } from './entities/pickup-item.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PickupItem])],
    controllers: [PickupItemController],
    providers: [PickupItemService],
})
export class PickupItemModule {}
