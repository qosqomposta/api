import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicePricingDto } from './dto/create-service-pricing.dto';
import { UpdateServicePricingDto } from './dto/update-service-pricing.dto';
import { ServicePricing } from './entities/service-pricing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { PickupDay } from 'src/pickup-day/entities/pickup-day.entity';
import { PickupItem } from 'src/pickup-item/entities/pickup-item.entity';
import { PickupItemService } from 'src/pickup-item/pickup-item.service';
import { PickupDayService } from 'src/pickup-day/pickup-day.service';

@Injectable()
export class ServicePricingService {
    constructor(
        @InjectRepository(ServicePricing)
        private servicePricingRepository: Repository<ServicePricing>,

        @InjectRepository(PickupItem)
        private readonly pickupItemRepository: Repository<PickupItem>,

        @InjectRepository(PickupDay)
        private readonly pickupDayRepository: Repository<PickupDay>,

        private readonly pickupItemService: PickupItemService,
        private readonly pickupDayService: PickupDayService,
    ) {}
    async create(
        createServicePricingDto: CreateServicePricingDto,
    ): Promise<ServicePricing> {
        const pickUpItems = await this.pickupItemRepository.findBy({
            pickupItem_id: In(createServicePricingDto.pickupItems),
        });

        if (pickUpItems.length === 0) {
            throw new NotFoundException('No pickup items found.');
        }
        const pickUpDays = await this.pickupDayRepository.findBy({
            pickupDay_id: In(createServicePricingDto.pickupDays),
        });

        if (pickUpDays.length === 0) {
            throw new NotFoundException('No pickup days found.');
        }

        const newDays: PickupDay[] = [];
        const newItems: PickupItem[] = [];

        const { newPickupDays, newPickupItems } = createServicePricingDto;

        if (newPickupDays) {
            for (const dayData of newPickupDays) {
                const dayCreated = await this.pickupDayService.create(dayData);
                newDays.push(dayCreated);
            }
        }

        if (newPickupItems) {
            for (const itemData of newPickupItems) {
                const itemCreated = await this.pickupItemService.create(
                    itemData,
                );
                newItems.push(itemCreated);
            }
        }

        const newServicePricing = this.servicePricingRepository.create({
            ...createServicePricingDto,
            pickupItems: [...pickUpItems, ...newItems],
            pickupDays: [...pickUpDays, ...newDays],
            id: randomUUID(),
        });
        return this.servicePricingRepository.save(newServicePricing);
    }

    async findAll(): Promise<ServicePricing[]> {
        return this.servicePricingRepository.find() ?? [];
    }

    async findOne(id: string): Promise<ServicePricing> {
        const servicePricing = await this.servicePricingRepository.findOne({
            where: { id: id },
        });
        if (!servicePricing) {
            throw new NotFoundException(
                `Waste Service with ID ${id} not found`,
            );
        }

        return servicePricing;
    }

    async update(
        id: string,
        updateServicePricingDto: UpdateServicePricingDto,
    ): Promise<ServicePricing> {
        let servicePricing = await this.servicePricingRepository.findOne({
            where: { id: id },
        });

        const { pickupItems, pickupDays, ...updatePayload } =
            updateServicePricingDto;

        if (!servicePricing) {
            throw new NotFoundException(
                `Waste Service with ID ${id} not found`,
            );
        }

        if (pickupDays) {
            const pickupDaysUpdated = await this.pickupDayRepository.findBy({
                pickupDay_id: In(pickupDays),
            });
            servicePricing.pickupDays = pickupDaysUpdated;
        }
        if (pickupItems) {
            const pickupItemsUpdated = await this.pickupItemRepository.findBy({
                pickupItem_id: In(pickupItems),
            });
            servicePricing.pickupItems = pickupItemsUpdated;
        }

        servicePricing = { ...servicePricing, ...updatePayload };

        return this.servicePricingRepository.save(servicePricing);
    }

    async remove(id: string): Promise<string> {
        const servicePricing = await this.servicePricingRepository.findOne({
            where: { id: id },
        });
        if (!servicePricing) {
            throw new NotFoundException(
                `Waste Service with ID ${id} not found`,
            );
        }

        servicePricing.deletedAt = new Date();

        await this.servicePricingRepository.save(servicePricing);

        return `Waste Service with ID ${id} has been successfully deleted`;
    }

    async restore(id: string): Promise<ServicePricing> {
        const servicePricing = await this.servicePricingRepository.findOne({
            where: { id: id },
            withDeleted: true,
        });

        if (!servicePricing) {
            throw new NotFoundException(
                `Service Pricing with ID ${id} not found`,
            );
        }

        if (!servicePricing.deletedAt) {
            throw new Error(`Service Pricing with ID ${id} is not deleted`);
        }

        servicePricing.deletedAt = null;
        return this.servicePricingRepository.save(servicePricing);
    }
}
