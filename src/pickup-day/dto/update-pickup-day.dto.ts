import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePickupDayDto } from './create-pickup-day.dto';

export class UpdatePickupDayDto extends PartialType(
    OmitType(CreatePickupDayDto, ['newPlacesPickup'] as const),
) {}

export class UpdatePickupDayWithIdDto extends PartialType(CreatePickupDayDto) {
    pickupDay_id: number;
}
