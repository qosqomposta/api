import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWasteServiceDto } from './dto/create-waste-service.dto';
import { UpdateWasteServiceDto } from './dto/update-waste-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WasteService } from './entities/waste-service.entity';
import { In, Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { PickupItem } from 'src/pickup-item/entities/pickup-item.entity';
import { PickupDay } from 'src/pickup-day/entities/pickup-day.entity';
import { PickupDayService } from 'src/pickup-day/pickup-day.service';
import { PickupItemService } from 'src/pickup-item/pickup-item.service';
import { ServicePricing } from 'src/service-pricing/entities/service-pricing.entity';
import { ServicePricingService } from 'src/service-pricing/service-pricing.service';
import { CreateWasteServiceResponse } from './waste-service.interfaces';
import { RemoveWasteServicePricings } from './dto/remove-pricings.dto';

@Injectable()
export class WasteServiceService {
    constructor(
        @InjectRepository(WasteService)
        private wasteServiceRepository: Repository<WasteService>,

        @InjectRepository(PickupItem)
        private readonly pickupItemRepository: Repository<PickupItem>,

        @InjectRepository(PickupDay)
        private readonly pickupDayRepository: Repository<PickupDay>,

        @InjectRepository(ServicePricing)
        private readonly servicePricingRepository: Repository<ServicePricing>,

        private readonly pickupDayService: PickupDayService,
        private readonly pickupItemService: PickupItemService,
        private readonly servicePricingService: ServicePricingService,
    ) {}

    async create(
        createWasteServiceDto: CreateWasteServiceDto,
    ): Promise<CreateWasteServiceResponse> {
        const pickUpItems = await this.pickupItemRepository.findBy({
            pickupItem_id: In(createWasteServiceDto.pickupItems),
        });

        if (pickUpItems.length === 0) {
            throw new NotFoundException('No pickup items found.');
        }
        const pickUpDays = await this.pickupDayRepository.findBy({
            pickupDay_id: In(createWasteServiceDto.pickupDays),
        });

        if (pickUpDays.length === 0) {
            throw new NotFoundException('No pickup days found.');
        }

        const pricings = await this.servicePricingRepository.findBy({
            service_pricing_id: In(createWasteServiceDto.pricings),
        });

        if (pricings.length === 0) {
            throw new NotFoundException('No pricings found.');
        }

        const { newPickupDays, newPickupItems, newPricings } =
            createWasteServiceDto;

        const newDays: PickupDay[] = [];
        const newItems: PickupItem[] = [];
        const newServicePricings: ServicePricing[] = [];

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

        if (newPricings) {
            for (const itemData of newPricings) {
                const itemCreated = await this.servicePricingService.create(
                    itemData,
                );
                newServicePricings.push(itemCreated);
            }
        }
        const newWasteService = this.wasteServiceRepository.create({
            ...createWasteServiceDto,
            pickupItems: [...pickUpItems, ...newItems],
            pickupDays: [...pickUpDays, ...newDays],
            pricings: [...pricings, ...newServicePricings],
            waste_service_id: randomUUID(),
        });

        const createdWasteService = await this.wasteServiceRepository.save(
            newWasteService,
        );
        return {
            wasteService: createdWasteService,
        };
    }

    async findAll(): Promise<WasteService[]> {
        return this.wasteServiceRepository.find({
            relations: {
                pickupDays: true,
                pickupItems: true,
                pricings: true,
            },
        });
    }

    async findOne(id: string): Promise<WasteService> {
        const wasteService = await this.wasteServiceRepository.findOne({
            where: { waste_service_id: id },
        });
        if (!wasteService) {
            throw new NotFoundException(
                `Waste Service with ID ${id} not found`,
            );
        }

        return wasteService;
    }

    async update(
        id: string,
        updateWasteServiceDto: UpdateWasteServiceDto,
    ): Promise<WasteService> {
        let wasteService = await this.wasteServiceRepository.findOne({
            where: { waste_service_id: id },
        });
        const { pickupItems, pickupDays, pricings, ...updatedParams } =
            updateWasteServiceDto;

        if (!wasteService) {
            throw new NotFoundException(
                `Waste Service with ID ${id} not found`,
            );
        }

        if (pickupDays) {
            const pickupDaysUpdated = await this.pickupDayRepository.findBy({
                pickupDay_id: In(pickupDays),
            });
            wasteService.pickupDays = pickupDaysUpdated;
        }
        if (pickupItems) {
            const pickupItemsUpdated = await this.pickupItemRepository.findBy({
                pickupItem_id: In(pickupItems),
            });
            wasteService.pickupItems = pickupItemsUpdated;
        }

        if (pricings) {
            const pricingsUpdated = await this.servicePricingRepository.findBy({
                service_pricing_id: In(pickupItems),
            });
            wasteService.pricings = pricingsUpdated;
        }
        wasteService = { ...wasteService, ...updatedParams };

        return this.wasteServiceRepository.save(wasteService);
    }

    async remove(id: string): Promise<string> {
        const wasteService = await this.wasteServiceRepository.findOne({
            where: { waste_service_id: id },
        });
        if (!wasteService) {
            throw new NotFoundException(
                `Waste Service with ID ${id} not found`,
            );
        }

        wasteService.deletedAt = new Date();

        await this.wasteServiceRepository.save(wasteService);

        return `Waste Service with ID ${id} has been successfully deleted`;
    }

    async restore(id: string): Promise<WasteService> {
        const wasteService = await this.wasteServiceRepository.findOne({
            where: { waste_service_id: id },
            withDeleted: true,
        });

        if (!wasteService) {
            throw new NotFoundException(
                `Waste Service with ID ${id} not found`,
            );
        }

        if (!wasteService.deletedAt) {
            throw new Error(`Waste Service with ID ${id} is not deleted`);
        }

        wasteService.deletedAt = null;
        return this.wasteServiceRepository.save(wasteService);
    }

    async removePricings(
        removePricings: RemoveWasteServicePricings,
    ): Promise<WasteService> {
        const { service_id: id, pricingsIds: pricingsIdsToRemove } =
            removePricings;
        const wasteService = await this.wasteServiceRepository.findOne({
            where: { waste_service_id: id },
            relations: {
                pricings: true,
            },
        });
        if (!wasteService) {
            throw new NotFoundException(
                `Waste Service with ID ${id} not found`,
            );
        }

        wasteService.pricings = wasteService.pricings.filter((price) => {
            return !pricingsIdsToRemove.includes(price.service_pricing_id);
        });
        return await this.wasteServiceRepository.save(wasteService);
    }
}
