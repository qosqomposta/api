import { IsOptional, IsString } from 'class-validator';

export class FindAllWasteServicesDto {
    @IsOptional()
    @IsString()
    clientType?: string;
}
