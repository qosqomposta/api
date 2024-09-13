import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { ClientType } from 'src/enums/clientType.enum';

export class CreateWasteServiceDto {
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsOptional()
    @IsBoolean()
    readonly isDeliverable: boolean;

    @IsOptional()
    @IsBoolean()
    readonly isDefault: boolean;

    @IsOptional()
    @IsEnum(ClientType)
    readonly clientType: string;
}
