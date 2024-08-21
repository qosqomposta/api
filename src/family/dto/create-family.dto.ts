import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateFamilyDto {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsString()
    @IsOptional()
    reference: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @IsString()
    @IsOptional()
    customId: string;
}
