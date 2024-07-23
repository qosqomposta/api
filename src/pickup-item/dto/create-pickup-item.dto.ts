import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
export class CreatePickupItemDto {
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    readonly wasteServices?: number[];
}
