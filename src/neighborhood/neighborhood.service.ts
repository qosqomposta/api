import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNeighborhoodDto } from './dto/create-neighborhood.dto';
import { UpdateNeighborhoodDto } from './dto/update-neighborhood.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Neighborhood } from './entities/neighborhood.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class NeighborhoodService {
    constructor(
        @InjectRepository(Neighborhood)
        private readonly neighborhoodRepository: Repository<Neighborhood>,
    ) {}
    async create(
        createNeighborhoodDto: CreateNeighborhoodDto,
    ): Promise<Neighborhood> {
        const newNeighborhood = this.neighborhoodRepository.create({
            isActive: true,
            ...createNeighborhoodDto,
            id: randomUUID(),
        });
        return await this.neighborhoodRepository.save(newNeighborhood);
    }

    async findAll(): Promise<Neighborhood[]> {
        return await this.neighborhoodRepository.find();
    }

    async findOne(id: string): Promise<Neighborhood> {
        const neighborhood = await this.neighborhoodRepository.findOneBy({
            id: id,
        });

        if (!neighborhood) {
            throw new NotFoundException(`Neighborhood with id ${id} not found`);
        }

        return neighborhood;
    }

    async update(
        id: string,
        updateNeighborhoodDto: UpdateNeighborhoodDto,
    ): Promise<Neighborhood> {
        let neighborhood = await this.neighborhoodRepository.findOneBy({
            id: id,
        });

        if (!neighborhood) {
            throw new NotFoundException(`Neighborhood with id ${id} not found`);
        }

        neighborhood = { ...neighborhood, ...updateNeighborhoodDto };
        return await this.neighborhoodRepository.save(neighborhood);
    }

    async remove(id: string) {
        const neighborhood = await this.neighborhoodRepository.findOneBy({
            id: id,
        });

        if (!neighborhood) {
            throw new NotFoundException(`Neighborhood with id ${id} not found`);
        }

        neighborhood.deletedAt = new Date();
        await this.neighborhoodRepository.save(neighborhood);

        return `Neighborhood with ID ${id} has been successfully deleted`;
    }

    async restore(id: string): Promise<Neighborhood> {
        const neighborhood = await this.neighborhoodRepository.findOneBy({
            id: id,
        });

        if (!neighborhood) {
            throw new NotFoundException(`Neighborhood with id ${id} not found`);
        }

        if (!neighborhood.deletedAt) {
            throw new Error(`Neighborhood with ID ${id} is not deleted`);
        }

        neighborhood.deletedAt = null;
        return await this.neighborhoodRepository.save(neighborhood);
    }
}
