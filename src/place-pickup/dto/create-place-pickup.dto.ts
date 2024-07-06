import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlacePickupDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly referemce: string;

    @IsNumber()
    @IsOptional()
    readonly latitude: number;

    @IsNumber()
    @IsOptional()
    readonly longitude: number;
}
