import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryOrderDto } from './dto/create-delivery-order.dto';
import { UpdateDeliveryOrderDto } from './dto/update-delivery-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryOrder } from './entities/delivery-order.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class DeliveryOrderService {
    constructor(
        @InjectRepository(DeliveryOrder)
        private readonly deliveryOrderRepository: Repository<DeliveryOrder>,
    ) {}

    async create(
        createDeliveryOrderDto: CreateDeliveryOrderDto,
    ): Promise<DeliveryOrder> {
        const newDeliveryOrder = this.deliveryOrderRepository.create({
            ...createDeliveryOrderDto,
            id: randomUUID(),
        });
        return await this.deliveryOrderRepository.save(newDeliveryOrder);
    }

    async findAll(): Promise<DeliveryOrder[]> {
        return await this.deliveryOrderRepository.find();
    }

    async findOne(id: string): Promise<DeliveryOrder[]> {
        const deliveryOrder = this.deliveryOrderRepository.findBy({
            id: id,
        });

        if (!deliveryOrder) {
            throw new NotFoundException(
                `Delivery Order with id ${id} not found`,
            );
        }
        return deliveryOrder;
    }

    async update(
        id: string,
        updateDeliveryOrderDto: UpdateDeliveryOrderDto,
    ): Promise<DeliveryOrder> {
        let deliveryOrder = await this.deliveryOrderRepository.findOneBy({
            id: id,
        });

        if (!deliveryOrder) {
            throw new NotFoundException(
                `Delivery Order with id ${id} not found`,
            );
        }

        deliveryOrder = { ...deliveryOrder, ...updateDeliveryOrderDto };

        return await this.deliveryOrderRepository.save(deliveryOrder);
    }

    async remove(id: string) {
        const deliveryOrder = await this.deliveryOrderRepository.findOneBy({
            id: id,
        });

        if (!deliveryOrder) {
            throw new NotFoundException(
                `Delivery Order with id ${id} not found`,
            );
        }

        deliveryOrder.deletedAt = new Date();
        await this.deliveryOrderRepository.save(deliveryOrder);
    }

    async restore(id: string) {
        const deliveryOrder = await this.deliveryOrderRepository.findOneBy({
            id: id,
        });

        if (!deliveryOrder) {
            throw new NotFoundException(
                `Delivery Order with id ${id} not found`,
            );
        }

        deliveryOrder.deletedAt = null;
        await this.deliveryOrderRepository.save(deliveryOrder);
    }
}
