import {
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { SubscriptionStatus } from 'src/enums/subscription.enum';

export class CreateSubscriptionDto {
    @IsDate()
    startDate: Date;

    @IsDate()
    endDate: Date;

    @IsOptional()
    @IsString()
    familyId?: string;

    @IsEnum(SubscriptionStatus)
    @IsNotEmpty()
    status: SubscriptionStatus;

    @IsOptional()
    baldes: number;

    @IsOptional()
    @IsString()
    companyId?: string;
}
