import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateIf,
} from 'class-validator';
import { DaysOfWeek } from 'src/enums/days.enum';

export class CreatePickupDayDto {
    @IsEnum(DaysOfWeek)
    dayOfWeek: string;

    @IsBoolean()
    isAllDay: boolean;

    @IsNumber()
    @ValidateIf((data) => data.isAllDay === false)
    @IsNotEmpty()
    startTime: number;

    @IsNumber()
    @ValidateIf((data) => data.isAllDay === false)
    @IsNotEmpty()
    endTime: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    readonly wasteServices?: number[];
}
