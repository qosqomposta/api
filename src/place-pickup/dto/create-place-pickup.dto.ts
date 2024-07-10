import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlacePickupDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly reference: string;

    @IsNumber()
    @IsOptional()
    readonly latitude: number;

    @IsNumber()
    @IsOptional()
    readonly longitude: number;
}
