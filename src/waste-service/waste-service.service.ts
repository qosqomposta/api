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

@Injectable()
export class WasteServiceService {
    constructor(
        @InjectRepository(WasteService)
        private wasteServiceRepository: Repository<WasteService>,

        @InjectRepository(PickupItem)
        private readonly pickupItemRepository: Repository<PickupItem>,

        @InjectRepository(PickupDay)
        private readonly pickupDayRepository: Repository<PickupDay>,

        private readonly pickupDayService: PickupDayService,
        private readonly pickupItemService: PickupItemService,
    ) {}

    async create(
        createWasteServiceDto: CreateWasteServiceDto,
    ): Promise<WasteService> {
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

        const { newPickupDays, newPickupItems } = createWasteServiceDto;

        const newDays: PickupDay[] = [];
        const newItems: PickupItem[] = [];

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
        const newWasteService = this.wasteServiceRepository.create({
            ...createWasteServiceDto,
            pickupItems: [...pickUpItems, ...newItems],
            pickupDays: [...pickUpDays, ...newDays],
            waste_service_id: randomUUID(),
        });

        return this.wasteServiceRepository.save(newWasteService);
    }

    async findAll(): Promise<WasteService[]> {
        return this.wasteServiceRepository.find() ?? [];
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
        const { pickupItems, pickupDays, ...updatedParams } =
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
}
