import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { ClientType } from 'src/enums/clientType.enum';
import { CreatePickupDayDto } from 'src/pickup-day/dto/create-pickup-day.dto';
import { CreatePickupItemDto } from 'src/pickup-item/dto/create-pickup-item.dto';
import { CreateServicePricingDto } from 'src/service-pricing/dto/create-service-pricing.dto';

export class CreateWasteServiceDto {
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsOptional()
    @IsBoolean()
    readonly isDefault: boolean;

    @IsEnum(ClientType)
    readonly clientType: string;

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    readonly pickupDays?: number[];

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    readonly pickupItems?: number[];

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    readonly pricings?: number[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePickupItemDto)
    readonly newPickupItems?: CreatePickupItemDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePickupDayDto)
    readonly newPickupDays?: CreatePickupDayDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateServicePricingDto)
    readonly newPricings?: CreateServicePricingDto[];
}
