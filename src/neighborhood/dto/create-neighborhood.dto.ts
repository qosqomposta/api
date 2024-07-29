import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateNeighborhoodDto {
    @IsString()
    name: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}
