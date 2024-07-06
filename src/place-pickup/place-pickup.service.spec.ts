import { Test, TestingModule } from '@nestjs/testing';
import { PlacePickupService } from './place-pickup.service';

describe('PlacePickupService', () => {
    let service: PlacePickupService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PlacePickupService],
        }).compile();

        service = module.get<PlacePickupService>(PlacePickupService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
