import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateServicePricingDto {
    @IsNumber()
    readonly price: number;

    @IsNumber()
    @IsOptional()
    readonly frequency: number | null;

    @IsString()
    @IsOptional()
    readonly name: string;

    @IsNumber()
    @IsOptional()
    readonly oneTimePrice: number;

    @IsOptional()
    @IsString()
    readonly wasteServiceId: string;
}
