import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class YearQueryDto {
    @IsOptional()
    @Transform(({ value }) => Number(value) || new Date().getUTCFullYear())
    year?: number;
}

export class SummaryWeightsDto {
    totalWasteWeight: number;
    totalWasteWeightYear: number;
    totalWasteWeightNet: number;
}
