import { SubscriptionSummaryDto } from 'src/subscription/dto/subscription-summary.dto';

export class CustomerSummaryDto {
    customerSummary: {
        customerId: string;
        customerName: string;
        customerEmail: string;
        familyId: string;
        familyName: string;
    };
    subscriptionSummary: SubscriptionSummaryDto;
}
