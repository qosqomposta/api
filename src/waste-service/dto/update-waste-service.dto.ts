import { PartialType } from '@nestjs/mapped-types';
import { CreateWasteServiceDto } from './create-waste-service.dto';

export class UpdateWasteServiceDto extends PartialType(CreateWasteServiceDto) {}
