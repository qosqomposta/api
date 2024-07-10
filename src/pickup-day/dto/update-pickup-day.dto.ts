import { PartialType } from '@nestjs/mapped-types';
import { CreatePickupDayDto } from './create-pickup-day.dto';

export class UpdatePickupDayDto extends PartialType(CreatePickupDayDto) {}
