import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWasteServiceDto {
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly description: string;
}
