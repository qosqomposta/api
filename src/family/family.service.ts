import {
    forwardRef,
    Inject,
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
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class FamilyService {
    constructor(
        @InjectRepository(Family)
        private readonly familyRepository: Repository<Family>,
        @Inject(forwardRef(() => CustomerService))
        private readonly customerService: CustomerService,
    ) {}
    async create(createFamilyDto: CreateFamilyDto) {
        const newFamily = this.familyRepository.create({
            isActive: true,
            ...createFamilyDto,
            family_id: randomUUID(),
        });
        return await this.familyRepository.save(newFamily);
    }

    async findAll() {
        return await this.familyRepository.find();
    }

    async findOne(id: string): Promise<Family> {
        const family = await this.familyRepository.findOneBy({
            family_id: id,
        });

        if (!family) {
            throw new NotFoundException(`Family with id ${id} not found`);
        }
        return family;
    }

    async findByFirebaseUid(firebaseUid: string): Promise<Family> {
        const user = await this.customerService.findCustomerByFirebaseUid(
            firebaseUid,
        );
        if (!user) {
            throw new NotFoundException(
                `No se encontró el usuario ${firebaseUid}`,
            );
        }
        const family = await this.familyRepository.findOneBy({
            family_id: user.family.family_id,
        });

        if (!family) {
            throw new NotFoundException(
                `Family with id ${family.family_id} not found`,
            );
        }
        return family;
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
        const family = await this.familyRepository.findOne({
            where: {
                family_id: id,
            },
            withDeleted: true,
        });

        if (!family) {
            throw new NotFoundException(`Family with ID ${id} not found`);
        }

        if (!family.deletedAt) {
            throw new Error(`Family with ID ${id} is not deleted`);
        }

        family.deletedAt = null;
        return this.familyRepository.save(family);
    }
}
