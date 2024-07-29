import { PickupDay } from './entities/pickup-day.entity';

export interface FindDaysByIdsResponse {
    days: PickupDay[];
    notFoundedDaysMessage?: string;
}
