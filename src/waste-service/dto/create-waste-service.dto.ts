import { Type } from 'class-transformer';
import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { CreatePickupDayDto } from 'src/pickup-day/dto/create-pickup-day.dto';
import { CreatePickupItemDto } from 'src/pickup-item/dto/create-pickup-item.dto';

export class CreateWasteServiceDto {
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly description: string;

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
    @ValidateNested({ each: true })
    @Type(() => CreatePickupItemDto)
    readonly newPickupItems?: CreatePickupItemDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePickupDayDto)
    readonly newPickupDays?: CreatePickupDayDto[];
}
