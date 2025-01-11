import { IsString } from 'class-validator';

export class FindSubscriptionByCompanyDto {
    @IsString()
    company_id: string;
}
