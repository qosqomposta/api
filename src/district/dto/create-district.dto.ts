import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDistrictDto {
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly postalCode: string;
}
