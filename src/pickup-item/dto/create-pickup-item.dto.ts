import { IsNotEmpty } from 'class-validator';
export class CreatePickupItemDto {
    @IsNotEmpty()
    readonly name: string;

    readonly description: string;
}
