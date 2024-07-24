import { Type } from 'class-transformer';
import {
    IsArray,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { CreatePickupDayDto } from 'src/pickup-day/dto/create-pickup-day.dto';

export class CreatePlacePickupDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly reference: string;

    @IsNumber()
    @IsOptional()
    readonly latitude: number;

    @IsNumber()
    @IsOptional()
    readonly longitude: number;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    readonly pickupDays?: number[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePickupDayDto)
    readonly newPickupDays?: CreatePickupDayDto[];
}
