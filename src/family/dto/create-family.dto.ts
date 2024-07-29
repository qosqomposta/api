import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateFamilyDto {
    @IsString()
    name: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}
