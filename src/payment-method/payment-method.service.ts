import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment-method.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentMethodService {
    constructor(
        @InjectRepository(PaymentMethod)
        private readonly paymentMethodRepository: Repository<PaymentMethod>,
    ) {}
    async create(
        createPaymentMethodDto: CreatePaymentMethodDto,
    ): Promise<PaymentMethod> {
        const newPaymentMethod = this.paymentMethodRepository.create(
            createPaymentMethodDto,
        );
        return await this.paymentMethodRepository.save(newPaymentMethod);
    }

    async findAll(): Promise<PaymentMethod[]> {
        return await this.paymentMethodRepository.find();
    }

    async findOne(id: number): Promise<PaymentMethod> {
        const paymentMethod = await this.paymentMethodRepository.findOneBy({
            id: id,
        });

        if (!paymentMethod) {
            throw new NotFoundException(
                `Payment method with id ${id} not found`,
            );
        }
        return paymentMethod;
    }

    async update(
        id: number,
        updatePaymentMethodDto: UpdatePaymentMethodDto,
    ): Promise<PaymentMethod> {
        let paymentMethod = await this.paymentMethodRepository.findOneBy({
            id: id,
        });

        if (!paymentMethod) {
            throw new NotFoundException(
                `Payment method with id ${id} not found`,
            );
        }

        paymentMethod = { ...paymentMethod, ...updatePaymentMethodDto };
        return await this.paymentMethodRepository.save(paymentMethod);
    }

    async remove(id: number): Promise<string> {
        const paymentMethod = await this.paymentMethodRepository.findOne({
            where: { id: id },
        });
        if (!paymentMethod) {
            throw new NotFoundException(
                `Payment Method with ID ${id} not found`,
            );
        }

        paymentMethod.deletedAt = new Date();

        await this.paymentMethodRepository.save(paymentMethod);
        return `Payment method with #${id} ID was removed`;
    }

    async restore(id: number): Promise<PaymentMethod> {
        const servicePricing = await this.paymentMethodRepository.findOne({
            where: { id: id },
            withDeleted: true,
        });

        if (!servicePricing) {
            throw new NotFoundException(
                `Payment method with ID ${id} not found`,
            );
        }

        if (!servicePricing.deletedAt) {
            throw new Error(`Payment method with ID ${id} is not deleted`);
        }

        servicePricing.deletedAt = null;
        return this.paymentMethodRepository.save(servicePricing);
    }
}
