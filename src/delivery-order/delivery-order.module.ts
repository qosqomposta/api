import { Module } from '@nestjs/common';
import { DeliveryOrderService } from './delivery-order.service';
import { DeliveryOrderController } from './delivery-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryOrder } from './entities/delivery-order.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DeliveryOrder, Subscription])],
    controllers: [DeliveryOrderController],
    providers: [DeliveryOrderService],
    exports: [DeliveryOrderService],
})
export class DeliveryOrderModule {}
