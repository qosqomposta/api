import { Module } from '@nestjs/common';
import { PickupItemService } from './pickup-item.service';
import { PickupItemController } from './pickup-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickupItem } from './entities/pickup-item.entity';
import { ServicePricing } from 'src/service-pricing/entities/service-pricing.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PickupItem, ServicePricing])],
    controllers: [PickupItemController],
    providers: [PickupItemService],
    exports: [PickupItemService],
})
export class PickupItemModule {}
