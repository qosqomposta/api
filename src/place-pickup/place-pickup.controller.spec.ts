import { Test, TestingModule } from '@nestjs/testing';
import { PlacePickupController } from './place-pickup.controller';
import { PlacePickupService } from './place-pickup.service';

describe('PlacePickupController', () => {
    let controller: PlacePickupController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlacePickupController],
            providers: [PlacePickupService],
        }).compile();

        controller = module.get<PlacePickupController>(PlacePickupController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
