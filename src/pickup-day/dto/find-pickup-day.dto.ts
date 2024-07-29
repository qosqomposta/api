import { IsArray, IsInt } from 'class-validator';

export class FindPickUpDayByIdDto {
    @IsArray()
    @IsInt({ each: true })
    dayIds: number[];
}
