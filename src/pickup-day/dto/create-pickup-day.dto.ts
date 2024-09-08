import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import { DaysOfWeek } from 'src/enums/days.enum';
import { CreatePlacePickupDto } from 'src/place-pickup/dto/create-place-pickup.dto';

export class CreatePickupDayDto {
    @IsEnum(DaysOfWeek)
    dayOfWeek: string;

    @IsBoolean()
    isAllDay: boolean;

    @IsNumber()
    @ValidateIf((data) => data.isAllDay === false)
    @IsNotEmpty()
    startTime: number;

    @IsNumber()
    @ValidateIf((data) => data.isAllDay === false)
    @IsNotEmpty()
    endTime: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    readonly pricings?: number[];

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    readonly placesPickup?: number[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePlacePickupDto)
    readonly newPlacesPickup?: CreatePlacePickupDto[];
}
