import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicePricingDto } from './dto/create-service-pricing.dto';
import { UpdateServicePricingDto } from './dto/update-service-pricing.dto';
import { ServicePricing } from './entities/service-pricing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class ServicePricingService {
    constructor(
        @InjectRepository(ServicePricing)
        private servicePricingRepository: Repository<ServicePricing>,
    ) {}
    async create(
        createServicePricingDto: CreateServicePricingDto,
    ): Promise<ServicePricing> {
        const newServicePricing = this.servicePricingRepository.create({
            ...createServicePricingDto,
            id: randomUUID(),
        });
        return this.servicePricingRepository.save(newServicePricing);
    }

    async findAll(): Promise<ServicePricing[]> {
        return this.servicePricingRepository.find() ?? [];
    }

    async findOne(id: string): Promise<ServicePricing> {
        const servicePricing = await this.servicePricingRepository.findOne({
            where: { id: id },
        });
        if (!servicePricing) {
            throw new NotFoundException(
                `Waste Service with ID ${id} not found`,
            );
        }

        return servicePricing;
    }

    async update(
        id: string,
        updateServicePricingDto: UpdateServicePricingDto,
    ): Promise<ServicePricing> {
        let servicePricing = await this.servicePricingRepository.findOne({
            where: { id: id },
        });
        if (!servicePricing) {
            throw new NotFoundException(
                `Waste Service with ID ${id} not found`,
            );
        }

        servicePricing = { ...servicePricing, ...updateServicePricingDto };

        return this.servicePricingRepository.save(servicePricing);
    }

    async remove(id: string): Promise<string> {
        const servicePricing = await this.servicePricingRepository.findOne({
            where: { id: id },
        });
        if (!servicePricing) {
            throw new NotFoundException(
                `Waste Service with ID ${id} not found`,
            );
        }

        servicePricing.deletedAt = new Date();

        await this.servicePricingRepository.save(servicePricing);

        return `Waste Service with ID ${id} has been successfully deleted`;
    }

    async restore(id: string): Promise<ServicePricing> {
        const servicePricing = await this.servicePricingRepository.findOne({
            where: { id: id },
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
        return this.servicePricingRepository.save(servicePricing);
    }
}
