import { PartialType } from '@nestjs/mapped-types';
import { CreatePlacePickupDto } from './create-place-pickup.dto';

export class UpdatePlacePickupDto extends PartialType(CreatePlacePickupDto) {}
