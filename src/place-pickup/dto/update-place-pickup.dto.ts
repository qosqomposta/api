import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePlacePickupDto } from './create-place-pickup.dto';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdatePickupDayWithIdDto } from 'src/pickup-day/dto/update-pickup-day.dto';

export class UpdatePlacePickupDto extends PartialType(
    OmitType(CreatePlacePickupDto, ['newPickupDays', 'pickupDays'] as const),
) {
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdatePickupDayWithIdDto)
    readonly updatedPickupDays?: UpdatePickupDayWithIdDto[];
}

export class UpdatePlacePickupWithIdDto extends PartialType(
    CreatePlacePickupDto,
) {
    pickupPlace_id: number;
}
