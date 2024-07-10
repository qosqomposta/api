import { Test, TestingModule } from '@nestjs/testing';
import { PickupDayController } from './pickup-day.controller';
import { PickupDayService } from './pickup-day.service';

describe('PickupDayController', () => {
    let controller: PickupDayController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PickupDayController],
            providers: [PickupDayService],
        }).compile();

        controller = module.get<PickupDayController>(PickupDayController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
