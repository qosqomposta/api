import { IsNumber } from 'class-validator';

export class CreateServicePricingDto {
    @IsNumber()
    readonly price: number;

    @IsNumber()
    readonly frequency: number | null;
}
