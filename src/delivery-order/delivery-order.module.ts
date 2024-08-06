import { Module } from '@nestjs/common';
import { DeliveryOrderService } from './delivery-order.service';
import { DeliveryOrderController } from './delivery-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryOrder } from './entities/delivery-order.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DeliveryOrder])],
    controllers: [DeliveryOrderController],
    providers: [DeliveryOrderService],
})
export class DeliveryOrderModule {}
