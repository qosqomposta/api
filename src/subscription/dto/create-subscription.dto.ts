import { IsDate } from 'class-validator';

export class CreateSubscriptionDto {
    @IsDate()
    startDate: Date;

    @IsDate()
    endDate: Date;
}
