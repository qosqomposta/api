import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { FindSubscriptionByFamilyIdDto } from './dto/find-by-family.dto';
import { FamilyService } from 'src/family/family.service';
import { SubscriptionSummaryDto } from './dto/subscription-summary.dto';
import { DeliveryOrderService } from 'src/delivery-order/delivery-order.service';
import { ClientType } from 'src/enums/clientType.enum';
import { SERVICE_TYPE } from 'src/enums/subscription.enum';
import { GetSubscriptionDto } from './dto/get-subscription.dto';
import { FindSubscriptionByCompanyDto } from './dto/find-by-company.dto';
import { CompanyService } from 'src/company/company.service';
import { FindSubscriptionByFirebaseUidDto } from './dto/find-by-firebaseuid.dto';
import {
    FRIDAY,
    FRIDAY_PICKUP,
    SATURDAY,
    SATURDAY_PICKUP,
} from 'src/main.config';
import { SummaryWeightsDto } from 'src/delivery-order/dto/total-waste-weight.dto';

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectRepository(Subscription)
        private readonly subscriptionRepository: Repository<Subscription>,
        private readonly familyService: FamilyService,
        private readonly companyService: CompanyService,
        private readonly deliveryOrderService: DeliveryOrderService,
    ) {}
    async create(
        createSubscriptionDto: CreateSubscriptionDto,
    ): Promise<Subscription> {
        const newSubscription = this.subscriptionRepository.create({
            ...createSubscriptionDto,
            id: randomUUID(),
        });
        return await this.subscriptionRepository.save(newSubscription);
    }

    async findAll(): Promise<Subscription[]> {
        return await this.subscriptionRepository.find();
    }

    async findOne(id: string): Promise<Subscription> {
        const subscription = this.subscriptionRepository.findOneBy({
            id: id,
        });
        if (!subscription) {
            throw new NotFoundException(`Subscription with id ${id} not found`);
        }
        return subscription;
    }

    async findSubscriptionSummaryByFamilyId(
        payload: FindSubscriptionByFamilyIdDto,
    ): Promise<SubscriptionSummaryDto> {
        if (!payload.family_id) {
            throw new BadRequestException('family_id is required');
        }

        const family = await this.familyService.findOne(payload.family_id);
        if (!family) {
            throw new NotFoundException(
                `Family with id ${payload.family_id} not found`,
            );
        }

        const subscription = await this.subscriptionRepository.findOne({
            where: {
                family: { family_id: family.family_id },
            },
            relations: ['pricings'],
        });

        if (!subscription) {
            throw new NotFoundException(
                `Subscriptions for family ${family.family_id} not found`,
            );
        }

        if (!subscription.pricings || subscription.pricings.length === 0) {
            throw new BadRequestException(
                `No pricing information found for subscription ${subscription.id}`,
            );
        }

        const pricings = subscription.pricings.map((value) => ({
            id: value.id,
            name: value.name,
            price: value.price,
            isAddon: value.isAddon,
            frequency: value.frequency,
        }));

        const hasAddons = subscription.pricings.some(
            (pricing) => pricing.isAddon,
        );
        const serviceType = hasAddons
            ? SERVICE_TYPE.INTEGRAL
            : SERVICE_TYPE.SINGLE;

        const mainServicePricing = pricings.find((value) => !value.isAddon);
        if (!mainServicePricing) {
            throw new BadRequestException(
                `No main service found for subscription ${subscription.id}`,
            );
        }

        let deliveryOrderSummary;
        try {
            deliveryOrderSummary =
                await this.deliveryOrderService.totalWasteWeightBySubscription(
                    subscription.id,
                    new Date().getFullYear(),
                );
        } catch (error) {
            console.error('Error fetching delivery order summary:', error);
            deliveryOrderSummary = {
                totalWasteWeight: 0,
                totalWasteWeightNet: 0,
                totalWasteWeightYear: 0,
            };
        }

        return {
            ...subscription,
            category: ClientType.FAMILY,
            serviceType: serviceType,
            totalWasteWeight: deliveryOrderSummary?.totalWasteWeight ?? 0,
            totalWasteWeightNet: deliveryOrderSummary?.totalWasteWeightNet ?? 0,
            totalWasteWeightYear:
                deliveryOrderSummary?.totalWasteWeightYear ?? 0,
            frequencyService: mainServicePricing.frequency,
            mainPrice: mainServicePricing.price,
        };
    }

    async findSubscriptionSummaryByCompanyId(
        payload: FindSubscriptionByCompanyDto,
    ): Promise<SubscriptionSummaryDto> {
        if (!payload.company_id) {
            throw new BadRequestException('company_id is required');
        }

        const company = await this.companyService.findOne(payload.company_id);
        if (!company) {
            throw new NotFoundException(
                `Company with id ${payload.company_id} not found`,
            );
        }

        const subscription = await this.subscriptionRepository.findOne({
            where: {
                company: { id: company.id },
            },
            relations: ['pricings'],
        });

        if (!subscription) {
            throw new NotFoundException(
                `Subscriptions for company ${company.id} not found`,
            );
        }

        if (!subscription.pricings || subscription.pricings.length === 0) {
            throw new BadRequestException(
                `No pricing information found for subscription ${subscription.id}`,
            );
        }

        const pricings = subscription.pricings.map((value) => ({
            id: value.id,
            name: value.name,
            price: value.price,
            isAddon: value.isAddon,
            frequency: value.frequency,
        }));

        const hasAddons = subscription.pricings.some(
            (pricing) => pricing.isAddon,
        );
        const serviceType = hasAddons
            ? SERVICE_TYPE.INTEGRAL
            : SERVICE_TYPE.SINGLE;

        const mainServicePricing = pricings.find((value) => !value.isAddon);
        if (!mainServicePricing) {
            throw new BadRequestException(
                `No main service found for subscription ${subscription.id}`,
            );
        }

        let deliveryOrderSummary: SummaryWeightsDto;
        try {
            deliveryOrderSummary =
                await this.deliveryOrderService.totalWasteWeightBySubscription(
                    subscription.id,
                    new Date().getFullYear(),
                );
        } catch (error) {
            console.error('Error fetching delivery order summary:', error);
            deliveryOrderSummary = {
                totalWasteWeight: 0,
                totalWasteWeightNet: 0,
                totalWasteWeightYear: 0,
            };
        }

        return {
            ...subscription,
            category: ClientType.COMPANY,
            serviceType: serviceType,
            totalWasteWeight: deliveryOrderSummary?.totalWasteWeight ?? 0,
            totalWasteWeightNet: deliveryOrderSummary?.totalWasteWeightNet ?? 0,
            totalWasteWeightYear:
                deliveryOrderSummary?.totalWasteWeightYear ?? 0,
            frequencyService: mainServicePricing.frequency,
            mainPrice: mainServicePricing.price,
        };
    }

    async findSubscriptionByFamilyId(
        payload: FindSubscriptionByFirebaseUidDto,
    ): Promise<GetSubscriptionDto> {
        if (!payload.firebaseUid) {
            throw new BadRequestException('firebaseUid is required');
        }

        const family = await this.familyService.findByFirebaseUid(
            payload.firebaseUid,
        );
        if (!family) {
            throw new NotFoundException(
                `Family with id ${payload.firebaseUid} not found`,
            );
        }

        const subscription = await this.subscriptionRepository.findOne({
            where: {
                family: { family_id: family.family_id },
            },
            relations: ['pricings'],
        });

        if (!subscription) {
            throw new NotFoundException(
                `Subscriptions for family ${family.family_id} not found`,
            );
        }

        if (!subscription.pricings || subscription.pricings.length === 0) {
            throw new BadRequestException(
                `No pricing information found for subscription ${subscription.id}`,
            );
        }

        const pricings = subscription.pricings.map((value) => ({
            id: value.id,
            name: value.name,
            price: value.price,
            isAddon: value.isAddon,
            frequency: value.frequency,
        }));

        const hasAddons = subscription.pricings.some(
            (pricing) => pricing.isAddon,
        );
        const serviceType = hasAddons
            ? SERVICE_TYPE.INTEGRAL
            : SERVICE_TYPE.SINGLE;

        const mainServicePricing = pricings.find((value) => !value.isAddon);
        if (!mainServicePricing) {
            throw new BadRequestException(
                `No main service found for subscription ${subscription.id}`,
            );
        }

        return {
            ...subscription,
            category: ClientType.FAMILY,
            serviceType: serviceType,
            frequencyService: mainServicePricing.frequency,
            mainPrice: mainServicePricing.price,
            dayOfPickup: SATURDAY_PICKUP.includes(family.district)
                ? SATURDAY
                : FRIDAY_PICKUP.includes(family.district)
                ? FRIDAY
                : SATURDAY,
        };
    }

    async findSubscriptionByCompanyId(
        payload: FindSubscriptionByFirebaseUidDto,
    ): Promise<GetSubscriptionDto> {
        if (!payload.firebaseUid) {
            throw new BadRequestException('firebaseUid is required');
        }

        const company = await this.companyService.findCompanyByFirebaseUid(
            payload.firebaseUid,
        );
        if (!company) {
            throw new NotFoundException(
                `Company with id ${payload.firebaseUid} not found`,
            );
        }

        const subscription = await this.subscriptionRepository.findOne({
            where: {
                company: { id: company.id },
            },
            relations: ['pricings'],
        });

        if (!subscription) {
            throw new NotFoundException(
                `Las subscripciones para la empresa ${company.id} no se ha encontrado`,
            );
        }

        if (!subscription.pricings || subscription.pricings.length === 0) {
            throw new BadRequestException(
                `No pricing information found for subscription ${subscription.id}`,
            );
        }

        const pricings = subscription.pricings.map((value) => ({
            id: value.id,
            name: value.name,
            price: value.price,
            isAddon: value.isAddon,
            frequency: value.frequency,
        }));

        const hasAddons = subscription.pricings.some(
            (pricing) => pricing.isAddon,
        );
        const serviceType = hasAddons
            ? SERVICE_TYPE.INTEGRAL
            : SERVICE_TYPE.SINGLE;

        const mainServicePricing = pricings.find((value) => !value.isAddon);
        if (!mainServicePricing) {
            throw new BadRequestException(
                `No main service found for subscription ${subscription.id}`,
            );
        }

        return {
            ...subscription,
            category: ClientType.COMPANY,
            serviceType: serviceType,
            frequencyService: mainServicePricing.frequency,
            mainPrice: mainServicePricing.price,
            dayOfPickup: SATURDAY_PICKUP.includes(company.district)
                ? SATURDAY
                : FRIDAY_PICKUP.includes(company.district)
                ? FRIDAY
                : SATURDAY,
        };
    }
    async update(
        id: string,
        updateSubscriptionDto: UpdateSubscriptionDto,
    ): Promise<Subscription> {
        let subscription = await this.subscriptionRepository.findOneBy({
            id: id,
        });
        if (!subscription) {
            throw new NotFoundException(`Subscription with id ${id} not found`);
        }

        subscription = { ...subscription, ...updateSubscriptionDto };
        return await this.subscriptionRepository.save(subscription);
    }

    async remove(id: string): Promise<string> {
        const subscription = await this.subscriptionRepository.findOneBy({
            id: id,
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
                id: id,
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
