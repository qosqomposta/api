import { IsArray, IsInt, IsString } from 'class-validator';

export class RemoveWasteServicePricings {
    @IsString()
    readonly service_id: string;

    @IsArray()
    @IsInt({ each: true })
    readonly pricingsIds: string[];
}
