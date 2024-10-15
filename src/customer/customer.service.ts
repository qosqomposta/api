import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { FamilyCustomerSummaryDto } from './dto/summary.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) {}
    async create(createCustomerDto: CreateCustomerDto) {
        const newCustomer = this.customerRepository.create({
            ...createCustomerDto,
            customer_id: randomUUID(),
        });
        return await this.customerRepository.save(newCustomer);
    }

    async findAll(): Promise<Customer[]> {
        return this.customerRepository.find();
    }

    async findOne(customer_id: string): Promise<Customer> {
        const customer = await this.customerRepository.findOneBy({
            customer_id: customer_id,
        });

        if (!customer) {
            throw new NotFoundException(
                `Customer with id ${customer_id} not found`,
            );
        }
        return customer;
    }

    async findCustomerByFirebaseUid(firebaseUid: string): Promise<Customer> {
        const customer = await this.customerRepository.findOneBy({
            firebaseUid: firebaseUid,
        });

        if (!customer) {
            throw new NotFoundException(
                `Customer with firebase uid ${firebaseUid} not found`,
            );
        }
        return customer;
    }

    async findFamilyDetails(firebaseUid: string): Promise<Customer> {
        const customer = await this.customerRepository.findOne({
            where: {
                firebaseUid: firebaseUid,
            },
            relations: ['family'],
        });

        if (!customer) {
            throw new NotFoundException(
                `Customer with firebase uid ${firebaseUid} not found`,
            );
        }
        return customer;
    }

    async update(
        id: string,
        updateCustomerDto: UpdateCustomerDto,
    ): Promise<Customer> {
        let customer = await this.customerRepository.findOneBy({
            customer_id: id,
        });

        if (!customer) {
            throw new NotFoundException(`Customer with id ${id} not found`);
        }
        customer = { ...customer, ...updateCustomerDto };
        return await this.customerRepository.save(customer);
    }

    async remove(id: string): Promise<string> {
        const customer = await this.customerRepository.findOneBy({
            customer_id: id,
        });

        if (!customer) {
            throw new NotFoundException(`Customer with id ${id} not found`);
        }

        customer.deletedAt = new Date();
        await this.customerRepository.save(customer);
        return `Customer with ID ${id} has been successfully deleted`;
    }
    async restore(id: string): Promise<Customer> {
        const customer = await this.customerRepository.findOne({
            where: {
                customer_id: id,
            },
            withDeleted: true,
        });

        if (!customer) {
            throw new NotFoundException(`Customer with id ${id} not found`);
        }

        if (!customer.deletedAt) {
            throw new Error(`Customer with id ${id} is not deleted`);
        }

        customer.deletedAt = null;
        return await this.customerRepository.save(customer);
    }

    async getFamilyCustomerSummary(firebaseUid: string): Promise<any> {
        const customerSummary = await this.customerRepository.findOne({
            where: {
                firebaseUid: firebaseUid,
            },
            relations: ['family', 'family.subscription'],
        });

        if (!customerSummary) {
            throw new NotFoundException(
                `Customer with id ${firebaseUid} not found`,
            );
        }
    }
}
