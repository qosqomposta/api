import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDeliveryOrderDto {
    @IsDate()
    date_received: Date;

    @IsNumber()
    waste_weight: number;

    @IsNumber()
    @IsOptional()
    compost: number;

    @IsString()
    note: string;

    @IsString()
    subscription_id: string;

    @IsString()
    courier_id: string;
}
