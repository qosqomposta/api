import { PartialType } from '@nestjs/mapped-types';
import { CreatePickupItemDto } from './create-pickup-item.dto';

export class UpdatePickupItemDto extends PartialType(CreatePickupItemDto) {}
