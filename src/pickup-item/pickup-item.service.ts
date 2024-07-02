import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePickupItemDto } from './dto/update-pickup-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PickupItem } from './entities/pickup-item.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class PickupItemService {
    constructor(
        @InjectRepository(PickupItem)
        private pickupItemRepository: Repository<PickupItem>,
    ) {}

    async create(createPickupItemDto: Partial<PickupItem>) {
        const newPickUpItem =
            this.pickupItemRepository.create(createPickupItemDto);

        return this.pickupItemRepository.save(newPickUpItem);
    }

    async findAll() {
        return this.pickupItemRepository.find() ?? [];
    }

    async findOne(id: number) {
        const pickUpItem = await this.pickupItemRepository.findOne({
            where: { pickupItem_id: id },
        });
        if (!pickUpItem) {
            throw new NotFoundException(`Pickup Item with ID ${id} not found`);
        }

        return pickUpItem;
    }

    async update(id: number, updatePickupItemDto: UpdatePickupItemDto) {
        let pickUpItem = await this.pickupItemRepository.findOne({
            where: { pickupItem_id: id },
        });
        if (!pickUpItem) {
            throw new NotFoundException(`Pickup item with ID ${id} not found`);
        }

        pickUpItem = { ...pickUpItem, ...updatePickupItemDto };

        return this.pickupItemRepository.save(pickUpItem);
    }

    async remove(id: number): Promise<string> {
        const pickUpItem = await this.pickupItemRepository.findOne({
            where: { pickupItem_id: id },
        });
        if (!pickUpItem) {
            throw new NotFoundException(`Pickup item with ID ${id} not found`);
        }

        pickUpItem.deletedAt = new Date();
        await this.pickupItemRepository.save(pickUpItem);
        return `Pickup item with ID ${id} has been successfully deleted`;
    }

    async restore(id: number): Promise<PickupItem> {
        const pickUpItem = await this.pickupItemRepository.findOne({
            where: { pickupItem_id: id },
            withDeleted: true,
        });

        if (!pickUpItem) {
            throw new NotFoundException(`Pickup item with ID ${id} not found`);
        }

        if (!pickUpItem.deletedAt) {
            throw new Error(`Pickup item with ID ${id} is not deleted`);
        }

        pickUpItem.deletedAt = null;
        return this.pickupItemRepository.save(pickUpItem);
    }
}
