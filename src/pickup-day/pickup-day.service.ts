import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePickupDayDto } from './dto/create-pickup-day.dto';
import { UpdatePickupDayDto } from './dto/update-pickup-day.dto';
import { PickupDay } from './entities/pickup-day.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PickupDayService {
    constructor(
        @InjectRepository(PickupDay)
        private pickupDayRepository: Repository<PickupDay>,
    ) {}

    async create(createPickupDayDto: CreatePickupDayDto): Promise<PickupDay> {
        const newPickupDay =
            this.pickupDayRepository.create(createPickupDayDto);

        return this.pickupDayRepository.save(newPickupDay);
    }

    async findAll(): Promise<PickupDay[]> {
        return this.pickupDayRepository.find() ?? [];
    }

    async findOne(id: number): Promise<PickupDay> {
        const pickupDay = await this.pickupDayRepository.findOne({
            where: { pickupDay_id: id },
        });
        if (!pickupDay) {
            throw new NotFoundException(`Pickup day with ID ${id} not found`);
        }

        return pickupDay;
    }

    async update(
        id: number,
        updatePickupDayDto: UpdatePickupDayDto,
    ): Promise<PickupDay> {
        let pickupDay = await this.pickupDayRepository.findOne({
            where: { pickupDay_id: id },
        });
        if (!pickupDay) {
            throw new NotFoundException(`Pickup Day with ID ${id} not found`);
        }

        pickupDay = { ...pickupDay, ...updatePickupDayDto };

        return this.pickupDayRepository.save(pickupDay);
    }

    async remove(id: number): Promise<string> {
        const pickupDay = await this.pickupDayRepository.findOne({
            where: { pickupDay_id: id },
        });
        if (!pickupDay) {
            throw new NotFoundException(`Pickup Day with ID ${id} not found`);
        }

        pickupDay.deletedAt = new Date();

        await this.pickupDayRepository.save(pickupDay);

        return `Pickup Day with ID ${id} has been successfully deleted`;
    }

    async restore(id: number): Promise<PickupDay> {
        const pickupDay = await this.pickupDayRepository.findOne({
            where: { pickupDay_id: id },
            withDeleted: true,
        });

        if (!pickupDay) {
            throw new NotFoundException(`Pickup Day with ID ${id} not found`);
        }

        if (!pickupDay.deletedAt) {
            throw new Error(`Pickup Day with ID ${id} is not deleted`);
        }

        pickupDay.deletedAt = null;
        return this.pickupDayRepository.save(pickupDay);
    }
}
