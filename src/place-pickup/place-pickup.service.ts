import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlacePickupDto } from './dto/create-place-pickup.dto';
import { UpdatePlacePickupDto } from './dto/update-place-pickup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlacePickup } from './entities/place-pickup.entity';
import { In, Repository } from 'typeorm';
import { PickupDay } from 'src/pickup-day/entities/pickup-day.entity';
import { PickupDayService } from 'src/pickup-day/pickup-day.service';

@Injectable()
export class PlacePickupService {
    constructor(
        @InjectRepository(PlacePickup)
        private placePickupRepository: Repository<PlacePickup>,

        @InjectRepository(PickupDay)
        private pickupDayRepository: Repository<PickupDay>,

        private readonly pickupDayService: PickupDayService,
    ) {}

    async create(
        createPlacePickupDto: CreatePlacePickupDto,
    ): Promise<PlacePickup> {
        const currentPickupDays = await this.pickupDayRepository.findBy({
            pickupDay_id: In(createPlacePickupDto.pickupDays ?? []),
        });

        for (const pickupDayData of createPlacePickupDto.newPickupDays) {
            const newPlacePickup = await this.pickupDayService.create(
                pickupDayData,
            );
            currentPickupDays.push(newPlacePickup);
        }

        const newPlacePickup = this.placePickupRepository.create({
            ...createPlacePickupDto,
            pickupDays: currentPickupDays,
        });

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

        const { updatedPickupDays, ...updateParams } = updatePlacePickupDto;

        if (updatedPickupDays) {
            let updatedDays: PickupDay[];
            for (const pickupDayData of updatedPickupDays) {
                const updatedPickupDay = await this.pickupDayService.update(
                    pickupDayData.pickupDay_id,
                    {
                        ...pickupDayData,
                    },
                );

                updatedDays.push(updatedPickupDay);
            }

            placePickup.pickupDays = updatedDays;
        }

        placePickup = { ...placePickup, ...updateParams };

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
