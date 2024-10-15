export class FamilyCustomerSummaryDto {
    customerId: number;
    customerName: string;
    customerEmail: string;
    familyId: number;
    familyName: string;
    subscription: {
        startDate: string;
        category: string;
        status: string;
        serviceType: string;
        totalWasteWeight: number;
        totalWasteWeightYear: number;
        totalWasteWeightNet: number;
        price: number;
        deliveryMode: string;
    };
}
