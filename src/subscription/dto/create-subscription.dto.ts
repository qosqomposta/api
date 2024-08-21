import { IsDate, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { SubscriptionStatus } from 'src/enums/subscription.enum';

export class CreateSubscriptionDto {
    @IsDate()
    startDate: Date;

    @IsDate()
    endDate: Date;

    @IsOptional()
    @IsNotEmpty()
    familyId?: number;

    @IsEnum(SubscriptionStatus)
    @IsNotEmpty()
    status: SubscriptionStatus;
}
