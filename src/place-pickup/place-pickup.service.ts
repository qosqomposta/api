import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlacePickupDto } from './dto/create-place-pickup.dto';
import { UpdatePlacePickupDto } from './dto/update-place-pickup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlacePickup } from './entities/place-pickup.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlacePickupService {
    constructor(
        @InjectRepository(PlacePickup)
        private placePickupRepository: Repository<PlacePickup>,
    ) {}

    async create(
        createPlacePickupDto: CreatePlacePickupDto,
    ): Promise<PlacePickup> {
        const newPlacePickup =
            this.placePickupRepository.create(createPlacePickupDto);
        return this.placePickupRepository.save(newPlacePickup);
    }

    async findAll(): Promise<PlacePickup[]> {
        return this.placePickupRepository.find() ?? [];
    }

    async findOne(id: number): Promise<PlacePickup> {
        const placePickup = await this.placePickupRepository.findOne({
            where: { placePickup_id: id },
        });
        if (!placePickup) {
            throw new NotFoundException(`Place Pickup with ID ${id} not found`);
        }

        return placePickup;
    }

    async update(
        id: number,
        updatePlacePickupDto: UpdatePlacePickupDto,
    ): Promise<PlacePickup> {
        let placePickup = await this.placePickupRepository.findOne({
            where: { placePickup_id: id },
        });
        if (!placePickup) {
            throw new NotFoundException(
                `Waste Service with ID ${id} not found`,
            );
        }

        placePickup = { ...placePickup, ...updatePlacePickupDto };

        return this.placePickupRepository.save(placePickup);
    }

    async remove(id: number): Promise<string> {
        const placePickup = await this.placePickupRepository.findOne({
            where: { placePickup_id: id },
        });
        if (!placePickup) {
            throw new NotFoundException(`Place Pickup with ID ${id} not found`);
        }

        placePickup.deletedAt = new Date();

        await this.placePickupRepository.save(placePickup);
        return `This action removes a #${id} placePickup`;
    }

    async restore(id: number): Promise<PlacePickup> {
        const servicePricing = await this.placePickupRepository.findOne({
            where: { placePickup_id: id },
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
        return this.placePickupRepository.save(servicePricing);
    }
}
