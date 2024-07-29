import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Family } from './entities/family.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class FamilyService {
    constructor(
        @InjectRepository(Family)
        private readonly familyRepository: Repository<Family>,
    ) {}
    async create(createFamilyDto: CreateFamilyDto) {
        const newFamily = this.familyRepository.create({
            ...createFamilyDto,
            family_id: randomUUID(),
            isActive: true,
        });
        return await this.familyRepository.save(newFamily);
    }

    async findAll() {
        return await this.familyRepository.find();
    }

    async findOne(id: string) {
        return await this.familyRepository.findOneBy({
            family_id: id,
        });
    }

    async update(id: string, updateFamilyDto: UpdateFamilyDto) {
        let family = await this.familyRepository.findOneBy({
            family_id: id,
        });

        if (!family) {
            throw new NotFoundException(`Family with id ${id} not found`);
        }

        family = { ...family, ...updateFamilyDto };
        return this.familyRepository.save(family);
    }

    async remove(id: string) {
        const family = await this.familyRepository.findOneBy({
            family_id: id,
        });

        if (!family) {
            throw new NotFoundException(`Family with id ${id} not found`);
        }

        family.deletedAt = new Date();
        try {
            await this.familyRepository.save(family);
            return `Family with ID ${id} has been successfully deleted`;
        } catch (error) {
            throw new InternalServerErrorException(
                `Failed to delete family: ${error.message}`,
            );
        }
    }

    async restore(id: string) {
        const family = await this.familyRepository.findOneBy({
            family_id: id,
        });

        if (!family) {
            throw new NotFoundException(`Pickup item with ID ${id} not found`);
        }

        if (!family.deletedAt) {
            throw new Error(`Pickup item with ID ${id} is not deleted`);
        }

        family.deletedAt = null;
        return this.familyRepository.save(family);
    }
}
