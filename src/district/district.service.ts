import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './entities/district.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DistrictService {
    constructor(
        @InjectRepository(District)
        private districtRepository: Repository<District>,
    ) {}

    async create(district: Partial<District>): Promise<District> {
        console.log(district);
        const newDistrict = this.districtRepository.create(district);
        return this.districtRepository.save(newDistrict);
    }

    async findAll(): Promise<District[]> {
        return this.districtRepository.find() ?? [];
    }

    async findOne(id: number) {
        const district = await this.districtRepository.findOne({
            where: { district_id: id },
        });
        if (!district) {
            throw new NotFoundException(`District with ID ${id} not found`);
        }

        return district;
    }

    async update(
        id: number,
        updateDistrictDto: UpdateDistrictDto,
    ): Promise<District> {
        let district = await this.districtRepository.findOne({
            where: { district_id: id },
        });
        if (!district) {
            throw new NotFoundException(`District with ID ${id} not found`);
        }

        district = { ...district, ...updateDistrictDto };

        return this.districtRepository.save(district);
    }

    async remove(id: number): Promise<void> {
        const district = await this.districtRepository.findOne({
            where: { district_id: id },
        });
        if (!district) {
            throw new NotFoundException(`District with ID ${id} not found`);
        }

        district.deletedAt = new Date();
        console.log(district);
        await this.districtRepository.save(district);
    }

    async undelete(id: number): Promise<District> {
        const district = await this.districtRepository.findOne({
            where: { district_id: id },
            withDeleted: true,
        });

        if (!district) {
            throw new NotFoundException(`District with ID ${id} not found`);
        }

        if (!district.deletedAt) {
            throw new Error(`District with ID ${id} is not deleted`);
        }

        district.deletedAt = null;
        return this.districtRepository.save(district);
    }
}
