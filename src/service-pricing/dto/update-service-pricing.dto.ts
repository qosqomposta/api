import { PartialType } from '@nestjs/mapped-types';
import { CreateServicePricingDto } from './create-service-pricing.dto';

export class UpdateServicePricingDto extends PartialType(
    CreateServicePricingDto,
) {}
