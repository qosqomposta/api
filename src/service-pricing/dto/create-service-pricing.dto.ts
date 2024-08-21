import { IsNumber, IsOptional } from 'class-validator';

export class CreateServicePricingDto {
    @IsNumber()
    readonly price: number;

    @IsNumber()
    @IsOptional()
    readonly frequency: number | null;
}
