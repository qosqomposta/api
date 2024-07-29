import {
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreatePickupDayDto } from './dto/create-pickup-day.dto';
import { UpdatePickupDayDto } from './dto/update-pickup-day.dto';
import { PickupDay } from './entities/pickup-day.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { WasteService } from 'src/waste-service/entities/waste-service.entity';
import { PlacePickup } from 'src/place-pickup/entities/place-pickup.entity';
import { PlacePickupService } from 'src/place-pickup/place-pickup.service';
import { FindDaysByIdsResponse } from './pickup-day.interfaces';
import { FindPickUpDayByIdDto } from './dto/find-pickup-day.dto';

@Injectable()
export class PickupDayService {
    constructor(
        @InjectRepository(PickupDay)
        private pickupDayRepository: Repository<PickupDay>,

        @InjectRepository(WasteService)
        private readonly wasteServiceRepository: Repository<WasteService>,

        @InjectRepository(PlacePickup)
        private readonly placePickUpRepository: Repository<PlacePickup>,

        @Inject(forwardRef(() => PlacePickupService))
        private readonly placePickupService: PlacePickupService,
    ) {}

    async create(createPickupDayDto: CreatePickupDayDto): Promise<PickupDay> {
        const wasteServices = await this.wasteServiceRepository.findBy({
            waste_service_id: In(createPickupDayDto.wasteServices ?? []),
        });
        const currentPlacePickups = await this.placePickUpRepository.findBy({
            placePickup_id: In(createPickupDayDto.placesPickup ?? []),
        });

        const { newPlacesPickup } = createPickupDayDto;
        if (newPlacesPickup) {
            for (const placeData of newPlacesPickup) {
                const newPlacePickup = await this.placePickupService.create(
                    placeData,
                );
                currentPlacePickups.push(newPlacePickup);
            }
        }

        const newPickupDay = this.pickupDayRepository.create({
            ...createPickupDayDto,
            wasteServices: wasteServices,
            placePickups: currentPlacePickups,
        });

        return this.pickupDayRepository.save(newPickupDay);
    }

    async findAllByIds(
        findDto: FindPickUpDayByIdDto,
    ): Promise<FindDaysByIdsResponse> {
        const days = await this.pickupDayRepository.findBy({
            pickupDay_id: In(findDto.dayIds),
        });

        const notFoundedDays = [...findDto.dayIds].filter(
            (id) => !days.map((day) => day.pickupDay_id).includes(id),
        );

        let missingDaysMessage = undefined;
        if (notFoundedDays.length > 0) {
            missingDaysMessage = `Items with id's ${notFoundedDays.join(
                ', ',
            )} not found.`;
        }

        return {
            days: days,
            notFoundedDaysMessage: missingDaysMessage,
        };
    }

    async findAll(): Promise<PickupDay[]> {
        return (await this.pickupDayRepository.find()) ?? [];
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

        const { wasteServices, updatedPickupPlaces, ...updateParams } =
            updatePickupDayDto;

        if (wasteServices) {
            const updatedWasteServices =
                await this.wasteServiceRepository.findBy({
                    waste_service_id: In(wasteServices),
                });

            pickupDay.wasteServices = updatedWasteServices;
        }

        if (updatedPickupPlaces) {
            const updatedPlaces: PlacePickup[] = [];
            for (const place of updatedPickupPlaces) {
                const updatedPlace = await this.placePickupService.update(
                    place.pickupPlace_id,
                    {
                        ...place,
                    },
                );
                updatedPlaces.push(updatedPlace);
            }
            pickupDay.placePickups = updatedPlaces;
        }

        pickupDay = { ...pickupDay, ...updateParams };

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
