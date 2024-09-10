import {
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { SUBSCRIPTION_STATUS } from 'src/enums/subscription.enum';

export class CreateSubscriptionDto {
    @IsDate()
    startDate: Date;

    @IsDate()
    endDate: Date;

    @IsOptional()
    @IsString()
    familyId?: string;

    @IsEnum(SUBSCRIPTION_STATUS)
    @IsNotEmpty()
    status: SUBSCRIPTION_STATUS;

    @IsOptional()
    baldes: number;

    @IsOptional()
    @IsString()
    companyId?: string;
}
