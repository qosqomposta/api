import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreatePickupItemDto {
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    readonly wasteServices?: number[];
}
