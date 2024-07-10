import { Test, TestingModule } from '@nestjs/testing';
import { PickupDayService } from './pickup-day.service';

describe('PickupDayService', () => {
    let service: PickupDayService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PickupDayService],
        }).compile();

        service = module.get<PickupDayService>(PickupDayService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
