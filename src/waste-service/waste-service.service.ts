import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWasteServiceDto } from './dto/create-waste-service.dto';
import { UpdateWasteServiceDto } from './dto/update-waste-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WasteService } from './entities/waste-service.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class WasteServiceService {
    constructor(
        @InjectRepository(WasteService)
        private wasteServiceRepository: Repository<WasteService>,
    ) {}

    async create(
        createWasteServiceDto: CreateWasteServiceDto,
    ): Promise<WasteService> {
        const newWasteService = this.wasteServiceRepository.create({
            ...createWasteServiceDto,
            id: randomUUID(),
        });

        const createdWasteService = await this.wasteServiceRepository.save(
            newWasteService,
        );
        return createdWasteService;
    }

    async findAll(): Promise<WasteService[]> {
        return this.wasteServiceRepository.find({
            relations: {
                pricings: true,
            },
        });
    }

    async findOne(id: string): Promise<WasteService> {
        const wasteService = await this.wasteServiceRepository.findOne({
            where: { id: id },
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
            where: { id: id },
        });

        if (!wasteService) {
            throw new NotFoundException(
                `Waste Service with ID ${id} not found`,
            );
        }

        wasteService = { ...wasteService, ...updateWasteServiceDto };

        return this.wasteServiceRepository.save(wasteService);
    }

    async remove(id: string): Promise<string> {
        const wasteService = await this.wasteServiceRepository.findOne({
            where: { id: id },
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
            where: { id: id },
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
