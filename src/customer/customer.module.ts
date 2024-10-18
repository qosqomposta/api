import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { SubscriptionModule } from 'src/subscription/subscription.module';

@Module({
    imports: [TypeOrmModule.forFeature([Customer]), SubscriptionModule],
    controllers: [CustomerController],
    providers: [CustomerService],
})
export class CustomerModule {}
