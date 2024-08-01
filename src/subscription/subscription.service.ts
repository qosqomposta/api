import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectRepository(Subscription)
        private readonly subscriptionRepository: Repository<Subscription>,
    ) {}
    async create(
        createSubscriptionDto: CreateSubscriptionDto,
    ): Promise<Subscription> {
        const newSubscription = this.subscriptionRepository.create({
            ...createSubscriptionDto,
            subscription_id: randomUUID(),
        });
        return await this.subscriptionRepository.save(newSubscription);
    }

    async findAll(): Promise<Subscription[]> {
        return await this.subscriptionRepository.find();
    }

    async findOne(id: string): Promise<Subscription> {
        const subscription = this.subscriptionRepository.findOneBy({
            subscription_id: id,
        });
        if (!subscription) {
            throw new NotFoundException(`Subscription with id ${id} not found`);
        }
        return subscription;
    }

    async update(
        id: string,
        updateSubscriptionDto: UpdateSubscriptionDto,
    ): Promise<Subscription> {
        let subscription = await this.subscriptionRepository.findOneBy({
            subscription_id: id,
        });
        if (!subscription) {
            throw new NotFoundException(`Subscription with id ${id} not found`);
        }

        subscription = { ...subscription, ...updateSubscriptionDto };
        return await this.subscriptionRepository.save(subscription);
    }

    async remove(id: string): Promise<string> {
        const subscription = await this.subscriptionRepository.findOneBy({
            subscription_id: id,
        });
        if (!subscription) {
            throw new NotFoundException(`Subscription with id ${id} not found`);
        }

        subscription.deletedAt = new Date();
        await this.subscriptionRepository.save(subscription);

        return `Subscription with ID ${id} has been successfully deleted`;
    }

    async restore(id: string): Promise<Subscription> {
        const subscription = await this.subscriptionRepository.findOne({
            where: {
                subscription_id: id,
            },
            withDeleted: true,
        });
        if (!subscription) {
            throw new NotFoundException(`Subscription with id ${id} not found`);
        }

        if (!subscription.deletedAt) {
            throw new Error(`Subscription with ID ${id} is not deleted`);
        }

        subscription.deletedAt = null;
        return await this.subscriptionRepository.save(subscription);
    }
}
