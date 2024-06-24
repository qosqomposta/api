import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private usersRepository: Repository<Customer>,
    ) {}
    create(createCustomerDto: CreateCustomerDto) {
        return 'This action adds a new customer';
    }

    findAll(): Promise<Customer[]> {
        return this.usersRepository.find();
    }

    findOne(customer_id: number): Promise<Customer | null> {
        return this.usersRepository.findOneBy({ customer_id });
    }

    update(id: number, updateCustomerDto: UpdateCustomerDto) {
        return `This action updates a #${id} customer`;
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
