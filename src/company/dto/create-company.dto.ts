import { IsEmail, IsInt, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsInt()
    ruc: number;

    @IsPhoneNumber()
    phone: string;

    @IsString()
    industry: string;

    @IsString()
    address: string;

    @IsEmail()
    email: string;

    @IsString()
    owner_name: string;
}
