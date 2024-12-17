import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { DeliveryOrderService } from './delivery-order.service';
import { CreateDeliveryOrderDto } from './dto/create-delivery-order.dto';
import { UpdateDeliveryOrderDto } from './dto/update-delivery-order.dto';
import { FindOptionsOrderValue } from 'typeorm';

@Controller('delivery-order')
export class DeliveryOrderController {
    constructor(private readonly deliveryOrderService: DeliveryOrderService) {}

    @Post()
    create(@Body() createDeliveryOrderDto: CreateDeliveryOrderDto) {
        return this.deliveryOrderService.create(createDeliveryOrderDto);
    }

    @Get()
    findAll() {
        return this.deliveryOrderService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.deliveryOrderService.findOne(id);
    }

    @Get('/waste-weight/:id')
    totalWasteWeightBySubscription(
        @Param('id') id: string,
        @Query('year') year?: number,
    ) {
        return this.deliveryOrderService.totalWasteWeightBySubscription(
            id,
            year,
        );
    }

    @Get('/subscription/:id')
    findDeliveryOrdersBySubscription(
        @Param('id') id: string,
        @Query('dateOrder') dateOrder: 'ASC' | 'DESC',
        @Query('limit') limit: number,
    ) {
        return this.deliveryOrderService.findOrdersBySubscription(
            id,
            dateOrder,
            limit,
        );
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateDeliveryOrderDto: UpdateDeliveryOrderDto,
    ) {
        return this.deliveryOrderService.update(id, updateDeliveryOrderDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.deliveryOrderService.remove(id);
    }

    @Patch(':id/restore')
    restore(@Param('id') id: string) {
        return this.deliveryOrderService.restore(id);
    }
}
