import { DeliveryOrder } from 'src/delivery-order/entities/delivery-order.entity';
import { ServicePricing } from 'src/service-pricing/entities/service-pricing.entity';

export class ServicePricingSummaryDto extends ServicePricing {}

export class GetSubscriptionDto {
    id: string;
    startDate: Date;
    category: string;
    status: string;
    serviceType: string;
    frequencyService: number;
    mainPrice: number;
    pricings: ServicePricing[];
    deliver_orders: DeliveryOrder[];
    dayOfPickup: string;
}
