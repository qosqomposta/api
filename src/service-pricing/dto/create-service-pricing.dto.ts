import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateServicePricingDto {
    @IsNumber()
    readonly price: number;

    @IsNumber()
    @IsOptional()
    readonly frequency: number | null;

    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly wasteServiceId: string;
}
