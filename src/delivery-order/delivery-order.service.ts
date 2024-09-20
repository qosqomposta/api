import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryOrderDto } from './dto/create-delivery-order.dto';
import { UpdateDeliveryOrderDto } from './dto/update-delivery-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryOrder } from './entities/delivery-order.entity';
import { randomUUID } from 'crypto';
import { SubscriptionService } from 'src/subscription/subscription.service';

@Injectable()
export class DeliveryOrderService {
    constructor(
        @InjectRepository(DeliveryOrder)
        private readonly deliveryOrderRepository: Repository<DeliveryOrder>,
        private readonly subscriptionService: SubscriptionService,
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

    async totalWasteWeightBySubscription(
        subscription_id: string,
    ): Promise<Record<string, number>> {
        const subscription = await this.subscriptionService.findOne(
            subscription_id,
        );
        if (!subscription) {
            throw new NotFoundException('Subscription not found');
        }

        const deliveryOrder = await this.deliveryOrderRepository.find({
            where: {
                subscription: { id: subscription_id },
            },
        });

        let totalWeight = 0;
        let totalNeto = 0;
        let totalBaldesWeight = 0;

        totalWeight = Number(
            deliveryOrder
                .reduce((sum, item) => sum + Number(item.waste_weight), 0)
                .toPrecision(6),
        );

        totalBaldesWeight = Number(
            deliveryOrder.reduce(
                (sum, item) => sum + Number(item.peso_balde),
                0,
            ),
        );

        totalNeto = totalWeight - totalBaldesWeight;

        return {
            totalWeight: totalWeight,
            totalNeto: totalNeto,
        };
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
