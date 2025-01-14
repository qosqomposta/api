import { SubscriptionSummaryDto } from 'src/subscription/dto/subscription-summary.dto';

export class CompanySummaryDto {
    companySummary: {
        id: string;
        name: string;
        email: string;
        ownerName: string;
        district: string;
        phoneNumber: string;
    };
    subscriptionSummary: SubscriptionSummaryDto;
}
