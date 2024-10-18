import { SubscriptionSummaryDto } from 'src/subscription/dto/subscription-summary.dto';

export class CustomerSummaryDto {
    customerId: string;
    customerName: string;
    customerEmail: string;
    familyId: string;
    familyName: string;
    subscription: SubscriptionSummaryDto;
}
