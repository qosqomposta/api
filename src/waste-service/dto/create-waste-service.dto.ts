import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateWasteServiceDto {
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    readonly pickupDays?: number[];

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    readonly pickupItems?: number[];
}
