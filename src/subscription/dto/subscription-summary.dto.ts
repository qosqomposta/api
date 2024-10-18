import { ServicePricing } from 'src/service-pricing/entities/service-pricing.entity';

export class ServicePricingSummaryDto extends ServicePricing {}

export class SubscriptionSummaryDto {
    id: string;
    startDate: Date;
    category: string;
    status: string;
    serviceType: string;
    totalWasteWeight: number;
    totalWasteWeightYear: number;
    totalWasteWeightNet: number;
    frequencyService: number;
    pricings: ServicePricingSummaryDto[];
}
