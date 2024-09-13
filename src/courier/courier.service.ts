import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourierDto } from './dto/create-courier.dto';
import { UpdateCourierDto } from './dto/update-courier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Courier } from './entities/courier.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class CourierService {
    constructor(
        @InjectRepository(Courier)
        private readonly courierRepository: Repository<Courier>,
    ) {}
    async create(createCourierDto: CreateCourierDto): Promise<Courier> {
        const newCourier = this.courierRepository.create({
            ...createCourierDto,
            id: randomUUID(),
        });
        return await this.courierRepository.save(newCourier);
    }

    async findAll(): Promise<Courier[]> {
        return this.courierRepository.find();
    }

    async findOne(id: string): Promise<Courier> {
        return await this.courierRepository.findOneBy({ id: id });
    }

    async update(id: string, updateCourierDto: UpdateCourierDto) {
        let courier = await this.courierRepository.findOne({
            where: { id: id },
        });

        if (!courier) {
            throw new NotFoundException(`Courier with ID ${id} not found`);
        }
        courier = { ...courier, ...updateCourierDto };
        return await this.courierRepository.save(courier);
    }

    async remove(id: string): Promise<string> {
        const courier = await this.courierRepository.findOne({
            where: { id: id },
        });
        if (!courier) {
            throw new NotFoundException(`Courier with ID ${id} not found`);
        }

        courier.deletedAt = new Date();
        await this.courierRepository.save(courier);

        return `District with ID ${id} has been successfully deleted`;
    }

    async restore(id: string): Promise<Courier> {
        const courier = await this.courierRepository.findOne({
            where: { id: id },
            withDeleted: true,
        });

        if (!courier) {
            throw new NotFoundException(`Courier with ID ${id} not found`);
        }

        if (!courier.deletedAt) {
            throw new Error(`courier with ID ${id} is not deleted`);
        }

        courier.deletedAt = null;
        return this.courierRepository.save(courier);
    }
}
