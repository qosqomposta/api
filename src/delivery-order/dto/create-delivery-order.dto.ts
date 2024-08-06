import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDeliveryOrderDto {
    @IsDate()
    dateReceived: Date;

    @IsNumber()
    waste_weight: number;

    @IsNumber()
    @IsOptional()
    compost: number;

    @IsString()
    note: string;
}
