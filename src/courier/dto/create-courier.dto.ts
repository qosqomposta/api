import {
    IsEmail,
    IsInt,
    IsOptional,
    IsPhoneNumber,
    IsString,
} from 'class-validator';

export class CreateCourierDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    last_name: string;

    @IsOptional()
    @IsString()
    mother_last_name: string;

    @IsOptional()
    @IsInt()
    document_identity: number;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsPhoneNumber()
    phoneNumber: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsString()
    @IsOptional()
    refAddress: string;
}
