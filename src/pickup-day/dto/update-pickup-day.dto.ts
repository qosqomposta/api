import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePickupDayDto } from './create-pickup-day.dto';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdatePlacePickupWithIdDto } from 'src/place-pickup/dto/update-place-pickup.dto';

export class UpdatePickupDayDto extends PartialType(
    OmitType(CreatePickupDayDto, ['newPlacesPickup', 'placesPickup'] as const),
) {
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdatePlacePickupWithIdDto)
    readonly updatedPickupPlaces?: UpdatePlacePickupWithIdDto[];
}

export class UpdatePickupDayWithIdDto extends PartialType(CreatePickupDayDto) {
    pickupDay_id: number;
}
