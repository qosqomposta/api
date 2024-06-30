import { Test, TestingModule } from '@nestjs/testing';
import { PickupItemService } from './pickup-item.service';

describe('PickupItemService', () => {
    let service: PickupItemService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PickupItemService],
        }).compile();

        service = module.get<PickupItemService>(PickupItemService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
