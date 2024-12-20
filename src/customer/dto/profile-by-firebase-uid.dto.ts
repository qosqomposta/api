export class ProfileCustomer {
    customer_id: string;
    firebaseUid: string;
    name: string;
    document_identity: number;
    last_name: string;
    mother_last_name: string;
    email: string;
    phoneNumber: string;
    customId: string;
    deletedAt?: Date;
    family: {
        family_id: string;
        name: string;
        address: string;
        reference: string;
        isActive: boolean;
        deletedAt?: Date;
        customId: string;
    };
}
