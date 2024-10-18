export class ServicePricingSummaryDto {
    id: string;
    name: string;
    price: number;
    isAddon?: boolean;
    frequency?: number;
}

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
    servicePricings: ServicePricingSummaryDto[];
}
