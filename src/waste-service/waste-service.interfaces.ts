import { WasteService } from './entities/waste-service.entity';

export interface CreateWasteServiceResponse {
    wasteService: WasteService;
    notFoundedItems?: number[];
    notFoundedDays?: number[];
    notFoundedPricings?: number[];
}
