import {
    IsEmail,
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsString,
} from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    name: string;

    @IsNumber()
    document_identity: number;

    @IsString()
    last_name: string;

    @IsString()
    @IsOptional()
    mother_last_name: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber()
    phoneNumber: string;

    @IsString()
    reference: string;
}
