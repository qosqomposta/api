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

    @IsString()
    last_name: string;

    @IsString()
    mother_last_name: string;

    @IsInt()
    document_identity: number;

    @IsEmail()
    email: string;

    @IsPhoneNumber()
    phoneNumber: string;

    @IsString()
    address: string;

    @IsString()
    @IsOptional()
    refAddress: string;
}
