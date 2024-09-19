import { IsString } from 'class-validator';

export class FindSubscriptionByFamilyIdDto {
    @IsString()
    family_id: string;
}
