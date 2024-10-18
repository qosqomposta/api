import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryOrderDto } from './dto/create-delivery-order.dto';
import { UpdateDeliveryOrderDto } from './dto/update-delivery-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryOrder } from './entities/delivery-order.entity';
import { randomUUID } from 'crypto';
import { SummaryWeightsDto } from './dto/total-waste-weight.dto';
import { Subscription } from 'src/subscription/entities/subscription.entity';

@Injectable()
export class DeliveryOrderService {
    constructor(
        @InjectRepository(DeliveryOrder)
        private readonly deliveryOrderRepository: Repository<DeliveryOrder>,

        @InjectRepository(Subscription)
        private readonly subscriptionRespository: Repository<Subscription>,
    ) {}

    async create(
        createDeliveryOrderDto: CreateDeliveryOrderDto,
    ): Promise<DeliveryOrder> {
        const newDeliveryOrder = this.deliveryOrderRepository.create({
            ...createDeliveryOrderDto,
            peso_balde: 0.8,
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
        year: number,
    ): Promise<SummaryWeightsDto> {
        const subscription = await this.subscriptionRespository.findOne({
            where: {
                id: subscription_id,
            },
        });
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
        let totalWeightPerYear = 0;

        totalWeight = Number(
            deliveryOrder
                .reduce((sum, item) => sum + Number(item.waste_weight), 0)
                .toPrecision(6),
        );

        totalWeightPerYear = Number(
            deliveryOrder.reduce((sum, item) => {
                const itemYear = item.date_received.getUTCFullYear();
                return itemYear === year
                    ? sum + Number(item.waste_weight)
                    : sum;
            }, 0),
        );

        totalBaldesWeight = Number(
            deliveryOrder.reduce(
                (sum, item) => sum + Number(item.peso_balde),
                0,
            ),
        );

        totalNeto = totalWeight - totalBaldesWeight;

        return {
            totalWasteWeight: totalWeight,
            totalWasteWeightNet: totalNeto,
            totalWasteWeightYear: totalWeightPerYear,
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
