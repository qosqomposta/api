import { IsNotEmpty, IsString } from 'class-validator';
export class CreatePickupItemDto {
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly description: string;
}
