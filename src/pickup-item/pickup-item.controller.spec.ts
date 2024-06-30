import { Test, TestingModule } from '@nestjs/testing';
import { PickupItemController } from './pickup-item.controller';
import { PickupItemService } from './pickup-item.service';

describe('PickupItemController', () => {
    let controller: PickupItemController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PickupItemController],
            providers: [PickupItemService],
        }).compile();

        controller = module.get<PickupItemController>(PickupItemController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
